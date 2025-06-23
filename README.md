This a demo of comparing a design (image) to an actual webpage across browsers using Puppeteer.

The flow is:
1. Check the dimensions of the given image (design). - 
2. Upload image to Applitools as Baseline image (use [Eyes SDK for Images](https://www.npmjs.com/package/@applitools/eyes-images))
3. Upload screenshots from the actual webpage (use [Eyes SDK for Puppeteer](https://www.npmjs.com/package/@applitools/eyes-puppeteer)) and force comparison to the screenshot from step 2.
   The dimensions calculated in step 1 are used so that the webpage is rendered in the same viewport. 
   

To run the project:

```
npm i
npm test
```


The result show difference in the structure between the design and the webpage:
<img width="1623" alt="image" src="https://github.com/user-attachments/assets/5b002b3e-8ea0-4479-a8dc-ea63ec4049aa" />
