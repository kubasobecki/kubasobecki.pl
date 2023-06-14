import { NextApiRequest, NextApiResponse } from "next/types";

const projectsArray = [
  {
    id: 1,
    name: "Project 01",
    slug: "project-01",
    tags: ["UI", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2021-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor? Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 2,
    name: "Project 02",
    slug: "project-02",
    tags: ["Web App", "UI"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2022-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor?",
  },
  {
    id: 3,
    name: "Project 03",
    slug: "project-03",
    tags: ["Website", "Web App", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2023-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 4,
    name: "Project 04",
    slug: "project-04",
    tags: ["UI", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2021-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor? Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 5,
    name: "Project 05",
    slug: "project-05",
    tags: ["Web App", "UI"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2022-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor?",
  },
  {
    id: 6,
    name: "Project 06",
    slug: "project-06",
    tags: ["Website", "Web App", "Frontend", "Wordpress"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2023-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 7,
    name: "Project 07",
    slug: "project-07",
    tags: ["UI", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2021-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor? Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 8,
    name: "Project 08",
    slug: "project-08",
    tags: ["Web App", "UI", "HTML", "CSS", "Wordpress"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2022-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor?",
  },
  {
    id: 9,
    name: "Project 09",
    slug: "project-09",
    tags: ["Website", "Web App", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2023-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 10,
    name: "Project 10",
    slug: "project-10",
    tags: ["UI", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2021-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor? Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
  {
    id: 11,
    name: "Project 11",
    slug: "project-11",
    tags: ["Web App", "UI"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2022-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque dolor?",
  },
  {
    id: 12,
    name: "Project 12",
    slug: "project-12",
    tags: ["Website", "Web App", "Frontend"],
    stack: ["HTML", "CSS", "Wordpress"],
    date: "2023-12-17",
    images: {
      main: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      other: ["", "", "", "", ""],
    },
    description:
      "Neque praesentium debitis, illo vel facere ipsum blanditiis reprehenderit veritatis voluptatum laboriosam minima optio?",
  },
];

export default async function projectsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(400).json({ message: "Bad request 💩" });

  res.status(200).json(projectsArray);
}
