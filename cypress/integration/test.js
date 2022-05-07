
describe("Testing Artist Details", () => {
    it("I can find the Artist", () => {
        cy.visit("http://localhost:5050/");
        cy.get("#artist-name").type("Maroon 5");
        cy.get("#search-bar .btn")
            .trigger("click");
        cy.contains("Artist Details");
    });
});

describe("Testing Artist Details", () => {
    it("I can not find the Artist", () => {
        cy.visit("http://localhost:5050/");
        cy.on("window:alert", (str) => {
            expect(str).to.equal("No such Artist Found");
            cy.get("#artist-name").type("amna batool");
            cy.get("#search-bar .btn")
                .trigger("click");
        });
    });
});

describe("Testing Empty Input", () => {
    it("Empty input", () => {
        cy.visit("http://localhost:5050/");
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Artist Name should not empty");
            cy.get("#artist-name").should("have.value", "");
            cy.get("#search-bar .btn")
                .trigger("click");
        });
    });
});

describe("Testing Input starting with '?'", () => {
    it("Input starting with '?'", () => {
        cy.visit("http://localhost:5050/");
        cy.get("#artist-name").type("? and the mysterians");
        cy.get("#search-bar .btn")
            .trigger("click");
        cy.contains("Artist Details");

    });
});

describe("Testing Events", () => {
    it("I can find the Artist Events", () => {
        cy.visit("http://localhost:5050/");
        cy.get("#artist-name").type("Maroon 5");
        cy.get("#search-bar .btn")
            .trigger("click");
        cy.get("#event-list .btn").click();
        cy.contains("events");
    });
});

describe("Testing Events", () => {
    it("I can not find the Artist Events", () => {
        cy.visit("http://localhost:5050/");
        cy.get("#artist-name").type("zahra");
        cy.get("#search-bar .btn")
            .trigger("click");
        cy.get("#event-list .btn").click();
        cy.contains("no Events");
    });
});
