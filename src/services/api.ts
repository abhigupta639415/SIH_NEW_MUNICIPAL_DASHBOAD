import { mockIssues } from "../utils/mockData";
import { Issue } from "../types";

function createIssueFromBackend(data: { title: string; description: string; image: string }): Issue {
  return {
    id: `ISS-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // unique ID
    title: data.title,
    description: data.description,
    type: "roads_infrastructure",
    priority: "low",
    status: "new",
    reportedBy: "anonymous@email.com",
    reportedDate: new Date().toISOString(),
    assignedTo: "2",
    assignedDepartment: "General",
    location: {
      address: "Not specified",
      ward: "Ward 0",
      sector: "Sector 0",
      coordinates: [0, 0],
    },
    photos: data.image ? [data.image] : [],
    timeline: [
      {
        id: `tl-${Date.now()}`,
        type: "created",
        timestamp: new Date().toISOString(),
        user: "Citizen",
        description: "Issue reported",
      },
    ],
    comments: [],
  };
}


export async function fetchAllIssues(): Promise<Issue[]> {
  const res = await fetch("https://6e23bf024693.ngrok-free.app/core/issue/", {
    headers : {
      "ngrok-skip-browser-warning" : "69420",
    }
  }
    
  );
  const backendRaw = await res.json();

  const backendIssues = backendRaw.map((item: any) =>
    createIssueFromBackend({
      title: item.title,
      description: item.description,
      image: item.image,
    })
  );

  // Combine both
  return [...mockIssues, ...backendIssues];
}
