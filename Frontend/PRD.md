Yes, you are absolutely correct. Given the 4-hour timeline and the nature of the assignment (focus on logic, UI, and deployment), a **backend is not required**. You can manage all data using **client-side state** and **browser local storage**. This simplifies deployment significantly (static hosting) and allows you to focus on the allocation logic and UI.

Here is the updated **PRD (Version 1.2)** tailored specifically for a **Frontend-Only Architecture**.

---

# Product Requirements Document (PRD)
**Project Name:** Smart Hostel Room Allocation System  
**Version:** 1.2 (Frontend-Only Architecture)  
**Timeline:** 4 Hours  
**Architecture:** Client-Side Only (No Backend)  

---

## 1. Product Overview
The **Smart Hostel Room Allocation System** is a **single-page application (SPA)** that runs entirely in the browser. It manages hostel room inventory and automates allocation logic without requiring a server or database. Data is persisted locally in the user's browser to ensure functionality during the demo.

## 2. Architecture & Technology Stack
Since no backend is required, the stack focuses on speed, interactivity, and static deployment.

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Framework** | **React (via Vite)** | Fast development, component-based, easy state management. |
| **Language** | **JavaScript (ES6+)** | Reduces setup complexity compared to TypeScript for a 4-hour sprint. |
| **Styling** | **Tailwind CSS** | Rapid UI styling without custom CSS files. |
| **Data Persistence** | **localStorage API** | Saves room data in the browser so it survives page refreshes during the demo. |
| **Hosting** | **Vercel / Netlify** | Perfect for static frontend apps; free tier supports custom domains/HTTPS. |
| **Version Control** | **GitHub** | Required for repository hosting and commit history. |

## 3. Data Management (No Backend)
Instead of a database, the application will use a **Local State Management** approach.

- **Storage Mechanism:** `window.localStorage`
- **Data Structure:** An array of Room objects stored as a JSON string under the key `hostel_rooms`.
- **Initialization:** On app load, check `localStorage`. If empty, initialize with an empty array `[]`.
- **Limitations:** Data is specific to the browser/device. This is acceptable for the assignment scope.

## 4. Functional Requirements

### 4.1 Add Room
- **UI:** Form with inputs for `Room No`, `Capacity`, `AC (Checkbox)`, `Washroom (Checkbox)`.
- **Action:** On submit, validate inputs → Update State → Save to `localStorage`.
- **Validation:** 
  - Room No must be unique.
  - Capacity must be a positive number.

### 4.2 View All Rooms
- **UI:** Table or Card Grid displaying all rooms stored in state.
- **Action:** Render the `hostel_rooms` array from state.
- **Dynamic:** Updates immediately when a new room is added.

### 4.3 Search & Filter
- **UI:** Filter controls (Capacity Input, AC Dropdown, Washroom Dropdown).
- **Logic:** Filter the displayed list based on criteria without altering the main data state.
  - `capacity >= input`
  - `hasAC == selection` (if selection is not 'Any')
  - `hasAttachedWashroom == selection` (if selection is not 'Any')

### 4.4 Allocate Room (Core Logic)
- **UI:** Input for `Number of Students`, `Need AC`, `Need Washroom` + `Allocate` button.
- **Algorithm:**
  1. Retrieve all rooms from state.
  2. Filter rooms matching `AC` and `Washroom` requirements.
  3. Filter rooms where `capacity >= students`.
  4. **Sort** remaining rooms by `capacity` (Ascending).
  5. **Select** the first room (index 0).
  6. **Output:** Display Room Number or "No room available".

## 5. UI/UX Requirements
The Single Page Application (SPA) should have clear sections:

1.  **Header:** App Title.
2.  **Section 1: Add Room:** Form interface.
3.  **Section 2: Room Inventory:** Table view of all rooms.
4.  **Section 3: Allocation Tool:** Search filters + Allocation inputs + Result Display.
5.  **Feedback:** Toast messages or alerts for success (Room Added) or errors (Duplicate Room No).

## 6. Implementation Plan (4-Hour Sprint)

| Time | Task | Git Commit Message |
| :--- | :--- | :--- |
| **Hour 1** | **Setup:** Vite + React + Tailwind. Create basic layout. | `feat: initial project setup with Vite and Tailwind` |
| **Hour 2** | **Core State:** Implement `localStorage` logic + Add Room Form + View List. | `feat: implement add room and local storage persistence` |
| **Hour 3** | **Logic:** Build Search Filter + Allocation Algorithm. | `feat: add search filtering and allocation logic` |
| **Hour 4** | **Deploy:** Polish UI, Write README, Record Video, Push to Vercel. | `chore: final polish, README, and deployment` |

## 7. Deployment Strategy (Static)
1.  **Push Code:** Commit all code to GitHub repository.
2.  **Connect:** Log in to **Vercel** or **Netlify**.
3.  **Import:** Select the GitHub repository.
4.  **Build Settings:** 
    - Framework Preset: **Vite**
    - Build Command: `npm run build`
    - Output Directory: `dist`
5.  **Deploy:** Click Deploy. Copy the generated **Live URL**.

## 8. Deliverables Checklist
| Deliverable | Status | Notes |
| :--- | :--- | :--- |
| **GitHub Repo** | ✅ | Public link |
| **Live URL** | ✅ | Vercel/Netlify link (Static) |
| **README.md** | ✅ | Mention "No Backend / LocalStorage" |
| **Demo Video** | ✅ | Show data persisting after refresh |
| **Git Commits** | ✅ | Minimum 3 distinct commits |

## 9. Evaluation Alignment
| Criteria | How This Meets It |
| :--- | :--- |
| **Functionality** | All 4 features work via JavaScript logic. |
| **Logic** | Allocation algorithm runs client-side. |
| **UI** | Complete SPA interface. |
| **Code Quality** | Modular React components. |
| **Error Handling** | JS validation for forms and allocation logic. |
| **Deployment** | Static hosting meets the mandatory URL requirement. |

## 10. Risks & Mitigation
| Risk | Mitigation |
| :--- | :--- |
| **Data Loss on Clear Cache** | Mention in README that data is local. Add a "Reset Data" button for demo convenience. |
| **Deployment Build Error** | Test `npm run build` locally before pushing to GitHub. |
| **Video Timing** | Keep video under 2 mins; focus on Allocation Logic demo. |

---
**Approvals:**  
**Product Manager:** [Candidate Name]  
**Date:** [Current Date]