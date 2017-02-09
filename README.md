Note: This source code is intended to be used for learning purposes and personal use. It was originally written in 2015 as a quick project to let the author catch trains easier when heading home from soccer games at night. If you plan on building and distributing an app similar to this you should _really_ use the MTA's official API as they recommend.

This is released under the Creative Commons Attribution-NonCommercial 3.0 license. You can use this, tweak it, and share your changes with the world but as it does not use the MTA's API, do _not_ adapt it for commercial purposes. 


---------


# LIRR-Pebble


In 2015 I was constantly finding myself in a rush courtesy PATH or NJT delays after a RBNY soccer match. I'd get into New York Penn Station moments before my train home would depart on its one and a half hour journey. As amazing as the pizza in Penn was, it wasn't every night I'd want to spend an hour and a half doing nothing underground just to spend another hour and a half doing nothing on the train.

I fixed this problem with some Python, Javascript, and my Pebble Smartwatch.

While messing with the LIRR's API and developer site, I noticed a second train schedule lookup form-- one that had blatant query parameters for search and a relatively clean DOM structure to display results. I used Python with Beautiful Soup to build a screen scraper, then Pebble's Cloud Pebble and Javascript SDK to build a client.

Rather than falling down the escalators at Penn Station and pushing my way through human traffic to find the "board of fate" where my train would _hopefully_ still be listed with its track number, I could bypass the stampedes and catch my train, sometimes at the last second, by hitting a few buttons on my watch. It was _awesome_.

Alas, I'm no longer in New York, and I haven't used this in long enough where the LIRR's site has _probably_ changed making this obsolete, so I figure it wouldn't hurt to release this to show what I did.


----------


Another disclaimer: The source is _extremely_ specific to what my needs were. It does not list every station. The original watch app also did more than just train schedules and I've purged that functionality from the source


------


## Usage

The `server` is python and runs on port `1337`. Throw it somewhere in the magic program sky and access `/train_schedules`.

The `client` was written with Pebble's Javascript SDK. Load it into Cloud Pebble and cross your fingers the code still works. :) You _will_ have to make some coding changes... like updating the service URL and adding your own routes in.