const { DateTime } = require("luxon");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { PrismaClient } = require("./generated/prisma");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:7000" }],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Created
 */
app.post("/events", async (req, res) => {
  try {
    const { title, location, date } = req.body;

    const user = await prisma.users.findFirst();
    const userTimeZone = user?.timezone || "Asia/Karachi";

    const eventDate = date
      ? DateTime.fromISO(date, { zone: userTimeZone }).toUTC().toJSDate()
      : null;

    const event = await prisma.events.create({
      data: {
        title,
        location,
        date: eventDate,
      },
    });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/events", async (req, res) => {
  try {
    const user = await prisma.users.findFirst();
    const userTimeZone = user?.timezone || "Asia/Karachi";

    const events = await prisma.events.findMany({
      orderBy: {
        id: "asc", // Sort by id in descending order
      },
    });

    const converted = events.map((ev) => ({
      ...ev,
      date: ev.date
        ? DateTime.fromJSDate(ev.date, { zone: "utc" })
            .setZone(userTimeZone)
            .toISO()
        : null,
    }));

    res.json(converted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Failed to update event
 */
app.patch("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, date } = req.body;

    const user = await prisma.users.findFirst();
    const userTimeZone = user?.timezone || "Asia/Karachi";

    const eventDate = date
      ? DateTime.fromISO(date, { zone: userTimeZone }).toUTC().toJSDate()
      : null;

    const event = await prisma.events.update({
      where: { id: parseInt(id) },
      data: {
        title,
        location,
        date: eventDate,
      },
    });


    res.json(event);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(500).json({ error: "Failed to update event" });
    }
  }
});

app.listen(7000, () =>
  console.log("🚀 Server running at http://localhost:7000")
);