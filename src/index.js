const express = require("express");

const PORT = 3333;
const app = express();

app.use(express.json());

const projects = [{ id: 1, title: "One", owner: "Arthur" }];

app.get("/projects", (req, res) => {
  return res.status(200).json({
    data: {
      projects,
    },
  });
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectFound = projects.find((project) => {
    return project.id == id;
  });

  if (!projectFound) {
    return res.status(404).json({
      message: `Project with id ${id} not found.`,
    });
  }

  return res.status(200).json({
    data: {
      projectFound,
    },
  });
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const id = projects.length + 1;

  projects.push({ id, title, owner });

  return res.status(200).json({
    id,
    title,
    owner,
  });
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectFound = projects.find((project) => {
    return project.id == id;
  });

  if (!projectFound) {
    return res.status(404).json({
      message: `Project with id ${id} not found.`,
    });
  }

  if (!title && !owner)
    return res
      .status(404)
      .json({ message: "You must provide the new title or owner property." });

  if (title) projectFound.title = title;
  if (owner) projectFound.owner = owner;

  projectFoundIndex = projects.findIndex((project) => {
    return project.id == id;
  });

  projects[projectFoundIndex] = projectFound;

  const projectEdited = projects[projectFoundIndex];

  return res.status(200).json({
    projectEdited,
  });
});

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}. http://localhost:${PORT}`)
);
