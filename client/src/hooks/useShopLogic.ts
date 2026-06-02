import { useState, useRef, useEffect } from "react";

export interface ShopItem {
  id: string | number;
  quantity?: number;
  [key: string]: any; // This allows other properties (name, price) to pass through without strict checks for now
}

export const useShopLogic = () => {
  const [kitItems, setKitItems] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem("havenFallsKit");
    return saved ? JSON.parse(saved) : [];
  });

  const [campfireList, setCampfireList] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem("havenFallsCampfire");
    return saved ? JSON.parse(saved) : [];
  });

  const [addedProduct, setAddedProduct] = useState<ShopItem | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toastKey, setToastKey] = useState(0);

  // ---------------------------- JWT AUTO-LOGOUT SECURITY ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("havenToken");
    if (!token) return;

    let securityTimer: ReturnType<typeof setTimeout>;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      const timeRemaining = expirationTime - Date.now();

      const enforceLogout = () => {
        localStorage.removeItem("havenToken");
        localStorage.removeItem("havenFallsCampfire");
        localStorage.removeItem("havenFallsKit");
        window.location.href = "/login?session=expired";
      };

      if (timeRemaining <= 0) {
        enforceLogout();
      } else {
        securityTimer = setTimeout(enforceLogout, timeRemaining);
      }
    } catch (error) {
      console.error("Security vault error: Invalid token structure.");
      localStorage.removeItem("havenToken");
    }

    // Single return path for cleanup
    return () => {
      if (securityTimer) clearTimeout(securityTimer);
    };
  }, []);

  // Sync Kit items with localStorage
  useEffect(() => {
    localStorage.setItem("havenFallsKit", JSON.stringify(kitItems));
  }, [kitItems]);

  // Sync Campfire items with localStorage
  useEffect(() => {
    localStorage.setItem("havenFallsCampfire", JSON.stringify(campfireList));
  }, [campfireList]);

  // Sync Campfire with Database
  useEffect(() => {
    const token = localStorage.getItem("havenToken");

    if (token) {
      const syncCampfire = async () => {
        try {
          const response = await fetch(
            "http://localhost:5001/api/auth/campfire/sync",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ campfireList }),
            },
          );

          if (!response.ok) {
            console.error("Failed to secure campfire in the vault.");
          } else {
            console.log("Campfire securely synced to database.");
          }
        } catch (error) {
          console.error("Network error during campfire sync:", error);
        }
      };

      syncCampfire();
    }
  }, [campfireList]);

  const addToKit = (product: ShopItem) => {
    setKitItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? // Handling optional quantity for math
              { ...item, quantity: (item.quantity || 0) + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    setAddedProduct(product);
    setToastKey(Date.now());
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setAddedProduct(null);
    }, 5000);
  };

  const updateQuantity = (id: string | number, amount: number) => {
    setKitItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          // Optional quantity math
          const newQuantity = (item.quantity || 0) + amount;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      }),
    );
  };

  const removeFromKit = (id: string | number) => {
    setKitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCampfire = (product: ShopItem) => {
    setCampfireList((prevList) => {
      const exists = prevList.find((item) => item.id === product.id);
      if (exists) {
        return prevList.filter((item) => item.id !== product.id);
      }
      return [...prevList, product];
    });
  };

  const clearToast = () => setAddedProduct(null);

  // Return block to export engine controls for other files
  return {
    kitItems,
    campfireList,
    addedProduct,
    toastKey,
    addToKit,
    updateQuantity,
    removeFromKit,
    toggleCampfire,
    clearToast,
  };
};
