const path = require('path')
const {imageSizeFromFile} = require('image-size/fromFile');



const puppeteer = require('puppeteer')

const imagePath = path.join(__dirname, 'demo.applitools.com_app.html_2.png');


// const viewport = {
//     width: 800,
//     height: 600
// }

async function getImageSize(imagePath, viewport) {
    const {width, height} = await imageSizeFromFile(imagePath);
    console.log(`Image size: ${width}x${height}`);
    return {width, height};
}


async function createBaselineFromImage(imagePath, viewport) {

    const { Eyes, Target, Configuration, BatchInfo,  } = require('@applitools/eyes-images');
    const eyes = new Eyes();
    const config = new Configuration();
    config.setBatch(new BatchInfo('Baseline Creation'));

    config.setSaveDiffs(true);
    // config.setSaveNewTests(true);
    config.setBaselineEnvName('BANKIMAGES');

    eyes.setConfiguration(config);
    await eyes.open('Applitools site', 'Image Comparison Test',  {width: viewport.width, height: viewport.height});

    // await eyes.check('Image', Target.image(imagePath));

    await eyes.check('Image', Target.image(path.resolve(imagePath)));

    await eyes.close();


}

async function runTest(viewport) {

    const {
    VisualGridRunner,
    ClassicRunner,
    RunnerOptions,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation
    } = require('@applitools/eyes-puppeteer');

    console.log(`running Puppeteer test with: ${viewport.width}x${viewport.height}`);


    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
         const page = await browser.newPage();

        const eyes = new Eyes(new VisualGridRunner(new RunnerOptions().testConcurrency(5)));

        const config = new Configuration();
        
        config.setBatch(new BatchInfo('Comparison'));
        config.addBrowser(viewport.width, viewport.height, BrowserType.CHROME);
        config.addBrowser(viewport.width, viewport.height, BrowserType.FIREFOX);
        config.addBrowser(viewport.width, viewport.height, BrowserType.SAFARI);

        config.setBaselineEnvName('BANKIMAGES');
        config.setSaveNewTests(false);


    
        eyes.setConfiguration(config);

        await eyes.open(page,  'Applitools site', 'Image Comparison Test', new RectangleSize(viewport.width, 600));

        await page.goto('https://demo.applitools.com');
        await page.type('#username', 'andy');
        await page.type('#password', 'i<3pandas');
        await page.click("#log-in");
        
        // Capture screenshot and compare with baseline
        await eyes.check('App Window', Target.window().fully().layout());


        const eyesResult = await eyes.close();
        console.log('Test results:', eyesResult);

    } finally {
        await browser.close();
    }
}


(async () => {
   const viewport = await getImageSize(imagePath).catch((err) => {
        console.error('Error getting image size:', err);
    })

    console.log('Image dimensions:', viewport);

    await createBaselineFromImage(imagePath, viewport).catch((err) => {
        console.error('Error creating baseline from image:', err);
    });



    await runTest(viewport).catch((err) => {
        console.error('Error during test execution:', err);
    }).finally(() => {
        console.log('Test completed');
    });
  
})()
