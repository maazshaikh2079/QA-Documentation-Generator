require('dotenv').config();
// const fs = require('fs');

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Generate a Defect Report in tabular format:-\n\n  Parameters / format for Defect Report:-\n  | FIELD | DETAILS |\n  |---|---|\n  | ID | (leave it empty) |\n  | PROJECT |  | \n  | PRODUCT |  |\n  | RELEASE VERSION |  | (leave it empty)\n  | MODULE |  |\n  | DETECTED BUILD VERSION |  | (leave it empty)\n  | SUMMARY |  |\n  | DESCRIPTION |  |\n  | STEPS TO REPLICATE |  |\n  | ACTUAL RESULTS |  |\n  | EXPECTED RESULTS |  |\n  | ATTACHMENTS | NA |\n  | REMARKS |  |\n  | DEFECT SEVERITY |  |\n  | DEFECT PRIORITY |  |\n  | REPORTED BY |  | (leave it empty)\n  | ASSIGNED TO |  | (leave it empty)\n  | STATUS |  |  (leave it empty)\n  | FIXED BUILD VERSION |  |  (leave it empty)\n\n  User Input / Test Cases / Discription:-\n  ( user will give manually ran test cases in tabular format which will help in generation of defect report in tabular format)\n\n  (Important: Generate only Defect Report in tabular format and nothing else!)",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };

  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "| Test Case ID | Specification                 | Objective                                                    | Input Data                                              | Expected Output                                                                 | Actual Output                                                                  | Status |\n|-------------|-----------------------------|------------------------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------|\n| TC_01       | Entry Sensor                  | Test sensor1 (entry sensor); detect car's presence          | Push entry sensor                                    | Sensor should detect car's presence                                            | Sensor detects car's presence                                                 | Pass   |\n| TC_02       | Camera Module                 | Test camera; start capturing frame on sensor's detection   | NA                                                 | Camera should start capturing frame                                           | Camera starts capturing frame                                                 | Pass   |\n| TC_03       | ML Model                      | Test haarcascade_russian_plate_number.xml ML Model; perform LPR | NA                                                 | ML Model should perform License Plate Recognition                             | ML Model performs License Plate Recognition                                   | Pass   |\n| TC_04       | ROI (Region of Interest)      | Check if ROI is marked when License Plate is recognized     | NA                                                 | ROI should be marked when License Plate is recognized                         | ROI is marked when License Plate is recognized                               | Pass   |\n| TC_05       | Scanned Image                 | Check scanned images of license plates                      | Scanned image of license plate                      | Scanned image should be captured and stored in images directory               | Scanned image is captured and stored in images directory                      | Pass   |\n| TC_06       | OCR (Optical Character Reading) | Check OCR implementation                                    | Scanned license plate image with text value        | OCR should extract text and store in `license_plate_no` variable              | OCR extracts text and stores in `license_plate_no` variable                   | Pass   |\n| TC_07       | Database Connectivity         | Test Firestore database connectivity                        | Configure and connect Firestore database with prepark.py script using key | Firestore should be configured and connected with prepark.py script            | Firestore is configured and connected with prepark.py script                  | Pass   |\n| TC_08       | License_Plates Collection     | Check documents storage in License_Plates collection       | Documents in License_Plates collection           | Documents should be present in License_Plates collection of Firestore project  | Documents are present in License_Plates collection of Firestore project        | Pass   |\n| TC_09       | Plates in Documents           | Check plate numbers present in documents                    | Plate numbers of registered vehicles             | Plate numbers should be in 'Plate' fields of License_Plates collection        | Plate numbers are in 'Plate' fields of License_Plates collection              | Pass   |\n| TC_10       | License Plate Registration    | Check License Plate's registration in Database             | `license_plate_no` value matching                | `license_plate_no` should match with a Plate in License_Plates collection     | `license_plate_no` matches with a Plate in License_Plates collection         | Pass   |\n| TC_11       | Entry Servo Motor             | Test servo movement on vehicle detection                   | Vehicle detection                                 | Servo should change its angle to 90°                                         | Servo changes its angle to 90°                                                | Pass   |\n| TC_12       | Exit Sensor 1                 | Test sensor2 (exit sensor 1); detect car's presence        | Push exit sensor1                                 | Sensor should detect car's presence                                          | Sensor detects car's presence                                                 | Pass   |\n| TC_13       | Exit Sensor 2                 | Test sensor3 (exit sensor 2); detect car's presence        | Push exit sensor2                                 | Sensor should detect car's presence                                          | Sensor detects car's presence                                                 | Pass   |\n| TC_14       | Exit Servo Motor              | Test servo motor2 (Exit servo motor) movement             | Vehicle detection                                 | Servo should change its angle to 90° when a vehicle is detected               | Servo does not change its angle to 90° when a vehicle is detected             | Fail   |\n| TC_15       | Street Lights                 | Test street lights operation with switch                   | Operate street light switch                      | Street lights should work                                                   | Street lights work                                                            | Pass   |\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "\n| FIELD                  | DETAILS                                                                                                |\n|------------------------|--------------------------------------------------------------------------------------------------------|\n| ID                     |                                                                                                                 |\n| PROJECT                | PrePark                                                                                                |\n| PRODUCT                | Smart Parking System                                                                                    |\n| RELEASE VERSION        |                                                                                                        |\n| MODULE                 | Exit Servo Motor                                                                                         |\n| DETECTED BUILD VERSION |                                                                                                        |\n| SUMMARY                | Exit Servo Motor (servo motor2) does not respond to vehicle detection                                                |\n| DESCRIPTION            | When a vehicle is detected, the servo motor2 (Exit servo motor) does not change its angle to 90° as expected. This results in a failure to open the exit barrier. |\n| STEPS TO REPLICATE     | 1. Ensure the system is running and connected to all sensors and motors. |\n|                        | 2. Place a vehicle in the exit sensor detection zone.                    |\n|                        | 3. Observe the exit servo motor.                                         |\n| ACTUAL RESULTS         | The exit servo motor remains in its default position and does not change its angle to 90° to allow exit. |\n| EXPECTED RESULTS       | The exit servo motor should change its angle to 90° when a vehicle is detected at the exit sensor.       |\n| ATTACHMENTS            | NA                                                                                                     |\n| REMARKS                | The issue is critical as it prevents vehicles from exiting the premises. Immediate attention and fix are required. |\n| DEFECT SEVERITY        | Major                                                                                                   |\n| DEFECT PRIORITY        | High                                                                                                    |\n| REPORTED BY            |                                                                                                        |\n| ASSIGNED TO            |                                                                                                        |\n| STATUS                 |                                                                                                        |\n| FIXED BUILD VERSION    |                                                                                                        |\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "| ID    | Specification                               | Objective                                                             | Input Data          | Expected Output                                                      | Actual Output                                                       | Status |\n|-------|--------------------------------------------|-----------------------------------------------------------------------|---------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|--------|\n| TC_01 | Public Parking Link                       | Test link to login page of public parking                            | Click on link      | Should redirect to login page of public parking                     | Redirects to login page of public parking                           | Pass   |\n| TC_02 | Email Field                               | Test email field of login page of public parking                     | Enter email        | Email field should allow entry of valid email address               | Email field allows entry of valid email address                     | Pass   |\n| TC_03 | Password Field                            | Test password field of login page of public parking                  | Enter password     | Password field should allow entry of valid password                 | Password field allows entry of valid password                       | Pass   |\n| TC_04 | Sign in Button (Public Parking)           | Test navigation to public parking home page (on click) if successful login | Click sign in button | If login is successful, navigate to public parking home page        | Unable to login, redirected to login page                           | Fail   |\n| TC_05 | Create an account Sign Up Link           | Test navigation to Sign up Page of Public Parking                    | Click sign up link | Should navigate to Sign up Page of Public Parking                   | Navigates to Sign up Page of Public Parking                         | Pass   |\n| TC_06 | Sign Up Button (Public Parking)          | Test email verification link and navigation to PrePark Home Page / Main Page / Index (on click) | Click sign up button | If verification is successful, should navigate to PrePark Home Page | Navigates to PrePark Home Page / Main Page / Index                 | Pass   |\n| TC_07 | Public Parking Home Page                 | Test home page; it should display every registered individual        | Navigate to home page | Home page should display list of every registered individual       | Home page displays list of every registered individual              | Pass   |\n| TC_08 | Society Automation Parking Link          | Test link to login page of society automation parking                | Click on link      | Should redirect to login page of society automation parking         | Redirects to login page of society automation parking               | Pass   |\n| TC_09 | Email Field (Society Automation Parking) | Test email field of login page of society automation parking         | Enter email        | Email field should allow entry of valid email address               | Email field allows entry of valid email address                     | Pass   |\n| TC_10 | Password Field (Society Automation Parking) | Test password field of login page of society automation parking      | Enter password     | Password field should allow entry of valid password                 | Password field allows entry of valid password                       | Pass   |\n| TC_11 | Sign in Button (Society Automation Parking) | Test navigation to society automation parking home page (on click) if successful login | Click sign in button | If login is successful, should navigate to society automation parking home page | Navigates to society automation parking home page | Pass   |\n| TC_12 | Create an account Sign Up Link (Society Automation Parking) | Test navigation to Sign up Page of society automation parking | Click sign up link | Should navigate to Sign up Page of society automation parking | Navigates to Sign up Page of society automation parking | Pass   |\n| TC_13 | Sign Up Button (Society Automation Parking) | Test email verification link and navigation to PrePark Home Page / Main Page / Index (on click) | Click sign up button | If verification is successful, should navigate to PrePark Home Page | Navigates to PrePark Home Page / Main Page / Index                 | Pass   |\n| TC_14 | Society Automation Parking Home Page     | Test home page; it should display every registered individual        | Navigate to home page | Home page should display list of every registered individual       | Home page displays list of every registered individual              | Pass   |\n| TC_15 | Collaborator Link                        | Test collaborator's page; it should display details of specific collaborator | Click collaborator link | Collaborator's page should display details of specific collaborator | Collaborator's page displays details of specific collaborator       | Pass   |\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "| FIELD                  | DETAILS                                                                                                |\n|------------------------|--------------------------------------------------------------------------------------------------------|\n| ID                     |                                                                                                        |\n| PROJECT                | PrePark                                                                                                |\n| PRODUCT                | Web Application                                                                                           |\n| RELEASE VERSION        |                                                                                                        |\n| MODULE                 | Public Parking Login                                                                                      |\n| DETECTED BUILD VERSION |                                                                                                        |\n| SUMMARY                | Unable to login to public parking, redirected to login page.                                                                        |\n| DESCRIPTION            | When attempting to log in as a public parking user, the application redirects back to the login page instead of navigating to the public parking home page, despite entering valid credentials. |\n| STEPS TO REPLICATE     | 1. Navigate to the public parking login page.                                                          |\n|                        | 2. Enter valid email and password.                                                                      |\n|                        | 3. Click the \"Sign in\" button.                                                                          |\n| ACTUAL RESULTS         | The application redirects back to the public parking login page.                                      |\n| EXPECTED RESULTS       | Upon successful login, the application should navigate to the public parking home page.                 |\n| ATTACHMENTS            | NA                                                                                                     |\n| REMARKS                | Users are unable to access the public parking features.  This is a critical issue.                     |\n| DEFECT SEVERITY        | Critical                                                                                               |\n| DEFECT PRIORITY        | High                                                                                                    |\n| REPORTED BY            |                                                                                                        |\n| ASSIGNED TO            |                                                                                                        |\n| STATUS                 |                                                                                                        |\n| FIXED BUILD VERSION    |                                                                                                        |\n"},
          ],
        },
      ],
    });

  let userInput = `
    | Test Case ID | Specification                         | Objective                                                      | Input Data                                             | Expected Output                                                                            | Actual Output                                                                              | Status |
    |-------------|-------------------------------------|----------------------------------------------------------------|------------------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------|
    | TC_01       | Hardware components interfacing     | Verify that the connection of the TDS sensor, turbidity sensor, and TFT screen to the Arduino MEGA board is correct | Hardware components connected to Arduino MEGA board | Connection of hardware components to Arduino MEGA board is correct | Connection of hardware components to Arduino MEGA board is correct | Pass   |
    | TC_02       | TDS Measurement Accuracy           | Verify the accuracy of TDS measurements.                       | Compare calculated TDS values with known standard solutions | TDS values should be converted to parts per million (PPM) accurately | TDS values are converted to parts per million (PPM) accurately | Pass   |
    | TC_03       | EC Calculation Accuracy            | Verify the accuracy of electrical conductivity (EC) calculation. | Test conductivity measurement accuracy using standard conductivity solutions | EC calculation for TDS sensors should be accurate | EC calculation for TDS sensors is accurate | Pass   |
    | TC_04       | PPM Calculation                    | Verify the calculation of parts per million (PPM) of dissolved solids in water. | Check the PPM calculation for dissolved solids in water samples | PPM calculation should be accurate | PPM calculation is accurate | Pass   |
    | TC_05       | Chart Calibration Validation       | Validate the correctness of EC and PPM charts.                 | Compare EC and PPM charts with known standard solutions | EC and PPM charts should match expected values | EC and PPM charts match expected values | Pass   |
    | TC_06       | Turbidity Measurement Accuracy     | Test the accuracy of turbidity measurement.                     | Use standard turbidity solutions for measurement | Turbidity measurement should be accurate | Turbidity measurement is accurate | Pass   |
    | TC_07       | NTU Calculation and Chart Calibration | Verify the calculation of Nephelometric Turbidity Units (NTU) based on turbidity sensor readings. | Compare NTU calculations with known standards | NTU calculation based on turbidity sensor readings should be accurate | NTU calculation based on turbidity sensor readings is accurate | Pass   |
    | TC_08       | Dynamic Range Testing              | Test the system's ability to measure a wide range of TDS and turbidity levels. | Measure TDS and turbidity at low and high concentrations | System should accurately measure a wide range of TDS and turbidity levels | System accurately measures a wide range of TDS and turbidity levels | Pass   |
    | TC_09       | Display Boot-up and Resolution     | Ensure the TFT screen initializes properly and maintains correct resolution. | Power on the system | TFT screen should initialize without distortion and maintain a resolution of 480x320 pixels | TFT screen initializes without distortion and maintains a resolution of 480x320 pixels | Pass   |
    | TC_10       | Sensor Readings Stability          | Verify that sensor readings remain stable over time.            | Monitor sensor readings over time | Sensor readings should remain stable under normal operating conditions | Sensor readings remain stable under normal operating conditions | Pass   |
    | TC_11       | Display Refresh Rate               | Ensure the display refresh rate is appropriate for real-time monitoring. | Monitor display refresh rate | Display refresh rate should be appropriate for real-time monitoring | Display refresh rate is not appropriate for real-time monitoring | Fail   |
    | TC_12       | Sensor Fault Handling              | Verify the system's response to sensor malfunctions.            | Introduce sensor malfunctions | System should respond appropriately to sensor malfunctions | System responds appropriately to sensor malfunctions | Pass   |
    | TC_13       | Power Interruption Handling        | Ensure the system retains calibration data after power interruption. | Interrupt power supply and restore power | System should retain calibration data and resume operation correctly after power interruption | System retains calibration data and resumes operation correctly after power interruption | Pass   |
  `;

  const result = await chatSession.sendMessage(userInput);

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");

    // TODO: Following code needs to be updated for client-side apps.
    const candidates = result.response.candidates;
    for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if(part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    // console.log(result.response.text());

    output = result.response.text()

    // fs.writeFile(`output.md`, output, (err) => {
    //   if (err) console.error('Error writing file:', err);
    //   else console.log(`Data saved to output.md`);
    // });

    fs.appendFile(`output/dr-op.md`, output + "\n\n---\n\n", (err) => {
      if (err) console.error("Error appending to file:", err);
      else console.log(`Data appended to tc-op.md`);
    });

}

async function run2(userInput) {
  try {
    const chatSession = model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(userInput);

    let output = result.response.text();

    output = output.replace(/```/g, '');

    // Save output to file
    const filename = "output/dr-op.md";
    fs.appendFile(filename, output + "\n\n---\n\n", (err) => {
      if (err) console.error("Error writing to file:", err);
      else console.log(`Defect Report appended to ${filename}`);
    });

    return output;
  } catch (error) {
    console.error("Error in generating Defect Report:", error);
    throw error;
  }
}

// run();
module.exports = { run2 };
