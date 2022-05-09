/// <reference types="cypress" />
import faker from "@faker-js/faker";

describe("Add Song", () => {
  it("should insert the song given a valid body", () => {
    const song = {
      name: faker.lorem.words(4),
      youtubeLink: "https://www.youtube.com/watch?v=G1YC-eGtscU",
    };

    cy.visit("http://localhost:3000/");

    cy.get("#songNameInput").type(song.name);
    cy.get("#songUrlInput").type(song.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as("addSong");

    cy.get("#sendSong").click();

    cy.wait("@addSong");

    cy.contains(song.name);
  });
});
