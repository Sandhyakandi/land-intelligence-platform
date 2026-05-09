// Runs once → seeds fake data into localStorage

export function seedDummyData() {
  if (!localStorage.getItem("submissions")) {
    const dummy = [
      {
        id: 1,
        area: "Benz Circle",
        price: 72000,
        lat: 16.506,
        lng: 80.648,
        type: "Commercial",
        status: "pending",
        date: "2026-01-10",
      },
      {
        id: 2,
        area: "Gannavaram",
        price: 28000,
        lat: 16.540,
        lng: 80.802,
        type: "Residential",
        status: "pending",
        date: "2026-01-12",
      },
      {
        id: 3,
        area: "Kankipadu",
        price: 19000,
        lat: 16.435,
        lng: 80.767,
        type: "Agricultural",
        status: "approved",
        date: "2026-01-15",
      },
      {
        id: 4,
        area: "Mangalagiri",
        price: 35000,
        lat: 16.430,
        lng: 80.568,
        type: "Residential",
        status: "rejected",
        date: "2026-01-18",
      },
    ];

    localStorage.setItem("submissions", JSON.stringify(dummy));

    // Approved markers for map
    const approved = dummy.filter(d => d.status === "approved");
    localStorage.setItem("approvedPrices", JSON.stringify(approved));
  }
}
