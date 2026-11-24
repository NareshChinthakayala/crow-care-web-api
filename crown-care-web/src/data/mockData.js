/**
 * DUMMY DATA — used by the mock API in `src/api` until the real backend is ready.
 * Edit names, prices, products, employees and orders here.
 */

/** The prototype pretends "today" is this date so the sample orders make sense. */
export const MOCK_TODAY = "2026-11-17";

export const seedData = {
  admin: {
    name: "Naomi Adebayo",
    email: "admin@crowncare.com",
    password: "admin123",
    salon: "CrownCare African Hair Studio",
    phone: "+1 (404) 555-0100",
    address: "214 Peachtree St NW, Atlanta, GA",
  },

  products: [
    { id: 1, service: "Men's African Hairstyles", product: "Cantu Coconut Curling Cream", duration: "45 min", servicePrice: 35, productPrice: 12.99, stock: 24 },
    { id: 2, service: "Cornrows", product: "Shine 'n Jam Magic Fingers Gel", duration: "2 hrs", servicePrice: 80, productPrice: 9.49, stock: 30 },
    { id: 3, service: "Twists", product: "African Pride Moisture Miracle Twist Cream", duration: "3 hrs", servicePrice: 120, productPrice: 8.99, stock: 18 },
    { id: 4, service: "Crochet", product: "African Pride Moisture Miracle Curl Refresher Spray", duration: "2.5 hrs", servicePrice: 110, productPrice: 7.99, stock: 15 },
    { id: 5, service: "Twist-outs", product: "Aunt Jackie's Curl La La", duration: "1.5 hrs", servicePrice: 65, productPrice: 10.49, stock: 5 },
    { id: 6, service: "Dreadlocks (Locs)", product: "Jamaican Mango & Lime Locking Gel", duration: "3 hrs", servicePrice: 150, productPrice: 8.49, stock: 20 },
    { id: 7, service: "Butterfly Locs", product: "The Doux Mousse Def Texture Foam", duration: "4 hrs", servicePrice: 180, productPrice: 15.99, stock: 9 },
    { id: 8, service: "Wash / Shampoo", product: "SheaMoisture Manuka Honey & Mafura Oil Shampoo", duration: "30 min", servicePrice: 25, productPrice: 11.99, stock: 22 },
    { id: 9, service: "Weave", product: "ORS Olive Oil Wrap/Set Mousse", duration: "3 hrs", servicePrice: 140, productPrice: 7.49, stock: 4 },
    { id: 10, service: "Single Braids", product: "Shine 'n Jam Magic Fingers Gel", duration: "5 hrs", servicePrice: 160, productPrice: 9.49, stock: 30 },
    { id: 11, service: "Box Braids", product: "African Pride Black Castor Miracle Braid Gel", duration: "5 hrs", servicePrice: 170, productPrice: 8.99, stock: 14 },
  ],

  employees: [
    { id: "E101", name: "Amara Okafor", role: "Senior Braider", phone: "+1 (404) 555-0141", email: "amara@crowncare.com", skills: "Box Braids, Single Braids, Cornrows", status: "Active", joined: "Mar 2023", password: "amara123" },
    { id: "E102", name: "Kwame Mensah", role: "Barber – Men's Styles", phone: "+1 (404) 555-0172", email: "kwame@crowncare.com", skills: "Men's African Hairstyles, Cornrows", status: "Active", joined: "Jul 2023", password: "kwame123" },
    { id: "E103", name: "Zainab Bello", role: "Loc Specialist", phone: "+1 (404) 555-0193", email: "zainab@crowncare.com", skills: "Dreadlocks, Butterfly Locs", status: "Active", joined: "Jan 2024", password: "zainab123" },
    { id: "E104", name: "Fatima Diallo", role: "Twist & Crochet Stylist", phone: "+1 (404) 555-0118", email: "fatima@crowncare.com", skills: "Twists, Twist-outs, Crochet", status: "Active", joined: "May 2024", password: "fatima123" },
    { id: "E105", name: "Chidi Eze", role: "Wash & Weave Stylist", phone: "+1 (404) 555-0155", email: "chidi@crowncare.com", skills: "Wash / Shampoo, Weave", status: "On Leave", joined: "Sep 2024", password: "chidi123" },
  ],

  /* status flow: New (unassigned) → Assigned → In Progress → Completed */
  orders: [
    { id: "ORD-1024", customer: "Grace Mwangi", phone: "+1 (404) 555-2210", serviceId: 11, date: "2026-11-17", time: "09:30", employeeId: "E101", status: "In Progress", progress: 60, source: "Walk-in", notes: "Medium length, colour 1B/30" },
    { id: "ORD-1025", customer: "Daniel Asante", phone: "+1 (404) 555-2231", serviceId: 1, date: "2026-11-17", time: "10:00", employeeId: "E102", status: "Completed", progress: 100, source: "Phone call", notes: "Fade with sponge twists" },
    { id: "ORD-1026", customer: "Blessing Nwosu", phone: "+1 (404) 555-2245", serviceId: 3, date: "2026-11-17", time: "11:00", employeeId: "E104", status: "In Progress", progress: 40, source: "Walk-in", notes: "Senegalese twists, waist length" },
    { id: "ORD-1027", customer: "Esther Kamau", phone: "+1 (404) 555-2258", serviceId: 6, date: "2026-11-17", time: "12:30", employeeId: "E103", status: "Assigned", progress: 0, source: "Phone call", notes: "Retwist + style" },
    { id: "ORD-1028", customer: "Ruth Owusu", phone: "+1 (404) 555-2263", serviceId: 2, date: "2026-11-17", time: "14:00", employeeId: "E101", status: "Assigned", progress: 0, source: "Walk-in", notes: "8 straight-back cornrows" },
    { id: "ORD-1029", customer: "Michael Adeyemi", phone: "+1 (404) 555-2277", serviceId: 1, date: "2026-11-17", time: "15:30", employeeId: null, status: "New", progress: 0, source: "Phone call", notes: "Line-up and curl sponge" },
    { id: "ORD-1030", customer: "Halima Yusuf", phone: "+1 (404) 555-2284", serviceId: 7, date: "2026-11-18", time: "09:00", employeeId: "E103", status: "Assigned", progress: 0, source: "Walk-in", notes: "Shoulder length, distressed" },
    { id: "ORD-1031", customer: "Joy Achieng", phone: "+1 (404) 555-2296", serviceId: 10, date: "2026-11-18", time: "10:30", employeeId: "E101", status: "Assigned", progress: 0, source: "Phone call", notes: "Knotless, small size" },
    { id: "ORD-1032", customer: "Precious Banda", phone: "+1 (404) 555-2302", serviceId: 4, date: "2026-11-18", time: "13:00", employeeId: null, status: "New", progress: 0, source: "Walk-in", notes: "Curly crochet, bob length" },
    { id: "ORD-1033", customer: "Ngozi Chukwu", phone: "+1 (404) 555-2319", serviceId: 9, date: "2026-11-19", time: "11:00", employeeId: null, status: "New", progress: 0, source: "Phone call", notes: "Sew-in, leave out" },
    { id: "ORD-1020", customer: "Aisha Kone", phone: "+1 (404) 555-2188", serviceId: 5, date: "2026-11-16", time: "16:00", employeeId: "E104", status: "Completed", progress: 100, source: "Walk-in", notes: "" },
    { id: "ORD-1021", customer: "Tendai Moyo", phone: "+1 (404) 555-2193", serviceId: 11, date: "2026-11-16", time: "10:00", employeeId: "E101", status: "Completed", progress: 100, source: "Phone call", notes: "Jumbo box braids" },
    { id: "ORD-1022", customer: "Sarah Ndlovu", phone: "+1 (404) 555-2201", serviceId: 8, date: "2026-11-16", time: "12:00", employeeId: "E105", status: "Completed", progress: 100, source: "Walk-in", notes: "Deep condition add-on" },
    { id: "ORD-1014", customer: "Lindiwe Dube", phone: "+1 (404) 555-2141", serviceId: 11, date: "2026-11-15", time: "09:00", employeeId: "E101", status: "Completed", progress: 100, source: "Walk-in", notes: "Medium knotless, bum length" },
    { id: "ORD-1015", customer: "Samuel Boateng", phone: "+1 (404) 555-2152", serviceId: 1, date: "2026-11-15", time: "11:30", employeeId: "E102", status: "Completed", progress: 100, source: "Phone call", notes: "Taper + twists" },
    { id: "ORD-1016", customer: "Abena Darko", phone: "+1 (404) 555-2163", serviceId: 6, date: "2026-11-15", time: "13:00", employeeId: "E103", status: "Completed", progress: 100, source: "Walk-in", notes: "Starter locs" },
    { id: "ORD-1017", customer: "Mercy Otieno", phone: "+1 (404) 555-2174", serviceId: 2, date: "2026-11-16", time: "14:30", employeeId: "E101", status: "Completed", progress: 100, source: "Walk-in", notes: "Feed-in cornrows, 6 rows" },
    { id: "ORD-1018", customer: "Yaw Asamoah", phone: "+1 (404) 555-2185", serviceId: 1, date: "2026-11-16", time: "15:00", employeeId: "E102", status: "Completed", progress: 100, source: "Phone call", notes: "" },
    { id: "ORD-1019", customer: "Nia Mutasa", phone: "+1 (404) 555-2196", serviceId: 3, date: "2026-11-16", time: "17:00", employeeId: "E104", status: "Completed", progress: 100, source: "WhatsApp", notes: "Passion twists" },
  ],
};
