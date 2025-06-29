This a demo of comparing a design (image) to an actual webpage across browsers using Puppeteer.

The flow is:
1. Check the dimensions of the given image (design). - 
2. Upload image to Applitools as Baseline image (use [Eyes SDK for Images](https://www.npmjs.com/package/@applitools/eyes-images))
3. Upload screenshots from the actual webpage (use [Eyes SDK for Puppeteer](https://www.npmjs.com/package/@applitools/eyes-puppeteer)) and force comparison to the screenshot from step 2.
   The dimensions calculated in step 1 are used so that the webpage is rendered in the same viewport. 
   

To run the project:

```
#make sure APPLITOOLS_API_KEY is set in env
npm i
npm test
```

--
The comparison is done across devices (Safari, Chrome, Firefox):
<img width="1684" alt="image" src="https://github.com/user-attachments/assets/e8eaf624-684b-4a47-90ae-21c2cd747ca6" />

The result show difference in the structure between the design and the webpage:
<img width="1623" alt="image" src="https://github.com/user-attachments/assets/5b002b3e-8ea0-4479-a8dc-ea63ec4049aa" />
The design is on the left (Baseline image)
The actual page - on the right.

The Eyes user can approve the differences, which will make the webapp screenshot into a baseline screenshot:
<img width="1657" alt="image" src="https://github.com/user-attachments/assets/f41dfa02-7082-4f0b-a65b-34bb15977dad" />

Then the user can continue checking the web app agains the initial webapp screenshot.

