import { v4 as uuidv4 } from "uuid";

export const InitialTodos = [
  {
    id: uuidv4(),
    title: "Pay electricity bill",
    details: "Due today, late fee applies after 5 PM. Amount: $84.50",
    isCompleted: false,
    priority: "urgent"
  },
  {
    id: uuidv4(),
    title: "Prepare client presentation",
    details: "Q3 sales report slides + competitor analysis. Deadline: tomorrow 10 AM",
    isCompleted: false,
    priority: "high"
  },
  {
    id: uuidv4(),
    title: "Schedule dentist appointment",
    details: "Routine 6-month checkup. Preferred: weekday after 3 PM",
    isCompleted: false,
    priority: "medium"
  },
  {
    id: uuidv4(),
    title: "Organize desktop files",
    details: "Move old screenshots & downloads to 'Archive' folder",
    isCompleted: true,
    priority: "low"
  },
  {
    id: uuidv4(),
    title: "Book flight for tech conference",
    details: "San Francisco, Nov 12-14. Compare Delta vs United prices",
    isCompleted: false,
    priority: "urgent"
  },
  {
    id: uuidv4(),
    title: "Finish monthly budget spreadsheet",
    details: "Reconcile credit card statements & update grocery category",
    isCompleted: true,
    priority: "high"
  },
  {
    id: uuidv4(),
    title: "Buy new running shoes",
    details: "Current pair has 500+ miles. Check Nike Pegasus or Asics Gel-Kayano",
    isCompleted: false,
    priority: "medium"
  },
  {
    id: uuidv4(),
    title: "Water indoor plants",
    details: "Fiddle leaf fig, snake plant & peace lily. Mist leaves lightly",
    isCompleted: false,
    priority: "low"
  },
  {
    id: uuidv4(),
    title: "Fix bathroom sink leak",
    details: "Plumber scheduled Thursday. Clear under-sink cabinet space first",
    isCompleted: false,
    priority: "high"
  },
  {
    id: uuidv4(),
    title: "Read 3 chapters of 'Deep Work'",
    details: "Take notes on Rule #3: Quit Social Media. Highlight key quotes",
    isCompleted: true,
    priority: "medium"
  },
  {
    id: uuidv4(),
    title: "Submit tax documents to accountant",
    details: "W2, 1099, & deduction receipts. Email sent & confirmed received",
    isCompleted: true,
    priority: "urgent"
  },
  {
    id: uuidv4(),
    title: "Backup phone photos to cloud",
    details: "Free up 15GB local storage before iOS update. Use Google Photos",
    isCompleted: false,
    priority: "low"
  }
];