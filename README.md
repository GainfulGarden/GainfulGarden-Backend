# GainfulGarden

## Team members

    - Kat Sauma
    - Katrina Cloyd
    - Nicole Martin
    - KB Boyles

## Problem

   - As a new gardener, it can be tough to know where to start when looking to grow your food. GainfulGarden gives these beginner gardeners an easy way to get started by allowing searching/filtering plants that will grow well in their environment, tracking plants they want to buy, and taking notes on plants they own to refer back to later.

## Project

   - GainfulGarden is a place for new gardeners to search for plants, get information about how to grow them, save them to a wishlist to buy later, and save them to their My Garden space to track with a journal.

## Versions

   - v 1.0.0 App

## Libraries used

    1) react-toastify
    2) react-hover-image
    3) react-router-dom
    4) superagent

## To get GainfulGarden up and running on your computer

    - npm i for dependencies

## Endpoints

- Auth Endpoints
  - /auth/signup
  - /auth/signin
- Search Endpoints

  - GET all edible plants (search page default) - /api/edible_search
  - GET detailed information about a plant - /api/plant_detail/:id
  - GET plants with any of these three filter options applied: vegetable=true, by edible part of plant (roots, leaves, or flowers/fruit), and light range (partial shade, partial sun, moderate to full sun, full sun) - /api/filtered_search
  - GET all plants with search text in common, family, or scientific name - /api/name_search

- Wishlist Endpoints

  - POST to add a plant to wishlist - /api/wishlist
  - GET all plants in wishlist - /api/wishlist
  - DELETE a plant from wishlist - /api/wishlist/:id

- My Garden Endpoints

  - POST to add to my_garden - /api/my_garden
  - GET all plants in my_garden - /api/my_garden
  - DELETE a plant from my_garden - /api/my_garden/:id

- Notes Endpoints
  - POST to notes /api/notes
  - GET notes for a single plant - /api/notes/:id

## Database schema

<img width="671" alt="GainfulGardenSchema" src="https://user-images.githubusercontent.com/71411431/110901272-ec996000-82b8-11eb-8925-faf5691d4a62.png">
