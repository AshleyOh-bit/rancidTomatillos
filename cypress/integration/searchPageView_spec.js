describe("User visits the search page view", () => {
  beforeEach(() => {
    cy.fixture("movies").then((movies) => {
      cy.intercept("https://rancid-tomatillos.herokuapp.com/api/v2/movies", {
        body: movies,
      }).as("movies");
    });
    cy.visit("http://localhost:3000");
  });

  it("Should show the user a page title", () => {
    cy.contains("h1", "Rancid Tomatillos");
  });

  it("should have a search input and button on the page", () => {
    cy.get("form").find("input").get("form").find("button");
  });

  it("should be able to search for a movie given an input", () => {
    cy.get("input")
      .type("Rogue")
      .get('.search-button').click()
      .get(".movie-container")
      .get("img")
      .should("have.class", "movie-poster")
      .get("button")
      .contains("More Info");
  });

  it("should show no results if input does not match film selection", () => {
    cy.get("input")
      .type("The Sopranos")
      .get('.search-button').click()
      .get(".movie-container")
      .get("img")
      .should("have.length", 0);
  });

  it("should show an error message if the input does not match film selection", () => {
    cy.get("input")
      .type("The Simpsons")
      .get('.search-button').click()
      .get(".movie-container")
      .get("img")
      .should("have.length", 0);
    cy.get("h2").contains(
      "Sorry, we couldn't find any movies to match your search. Please try again!"
    );
  });

  it("should clear input after user clicks on the more info button", () => {
    cy.get("input")
      .type("Mulan")
      .get('.search-button').click()
      .get(".movie-container")
      .get("img")
      .should("have.class", "movie-poster")
      .get("button")
      .contains("More Info")
      .click();
    cy.get("input").should("be.empty");
  });

  it("should clear input after user clicks on the movie poster", () => {
    cy.get("input")
      .type("Mulan")
      .get('.search-button').click()
      .get(".movie-container")
      .children()
      .should("have.length", 1)
      .get("img")
      .should("have.class", "movie-poster")
      .click({ force: true });
    cy.get("input").should("be.empty");
  });

  it("should display all movies if user clicks on search button with empty input", () => {
    cy.get("input").should("be.empty");
    cy.get("form")
      .find("button")
      .click()
      .location("pathname")
      .should("eq", "/search")
      .get(".movie-container")
      .children()
      .should("have.length", 41);
  });
});

