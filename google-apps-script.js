function doPost(e) {
  try {
    // Log the entire event object
    console.log("Received POST request with data:", JSON.stringify(e));

    // Get email from form data parameters
    const email = e.parameter.email;
    const timestamp = e.parameter.timestamp || new Date().toISOString();

    // Log the extracted data
    console.log("Extracted data:", { email, timestamp });

    // Validate email exists
    if (!email) {
      console.error("No email found in request");
      throw new Error(
        "Email is required. Received parameters: " + JSON.stringify(e.parameter)
      );
    }

    // Open your specific Google Sheet
    console.log("Opening sheet...");
    const sheetId = "1mWBPoRh049v6pb_eXw3F3QqXI4SLU3HhtmSGlxrsBLE";

    // Try to get the spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(sheetId);
      console.log("Successfully opened spreadsheet:", spreadsheet.getName());
    } catch (sheetError) {
      console.error("Failed to open spreadsheet:", sheetError);
      throw new Error(
        "Could not open spreadsheet. Please verify the sheet ID and permissions."
      );
    }

    // Get the active sheet
    const sheet = spreadsheet.getActiveSheet();
    console.log("Active sheet name:", sheet.getName());
    console.log("Current last row:", sheet.getLastRow());

    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      console.log("Adding headers...");
      sheet.getRange(1, 1, 1, 3).setValues([["Email", "Timestamp", "Date"]]);
      console.log("Headers added");
    }

    // Add the new email entry
    console.log("Adding new row...");
    const formattedDate = new Date(timestamp).toLocaleString();
    const rowData = [email, timestamp, formattedDate];
    sheet.appendRow(rowData);
    console.log("Row added successfully:", rowData);
    console.log("New last row:", sheet.getLastRow());

    // Return success response
    console.log("Returning success response");
    return ContentService.createTextOutput(
      "Success! Email received: " + email
    ).setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    // Log the full error details
    console.error("Error in doPost:", error);
    console.error("Error stack:", error.stack);
    console.error("Full event object at error:", JSON.stringify(e));

    // Try to write error to sheet for debugging
    try {
      const sheetId = "1mWBPoRh049v6pb_eXw3F3QqXI4SLU3HhtmSGlxrsBLE";
      const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
      sheet.appendRow(["ERROR", new Date().toISOString(), error.toString()]);
      console.log("Error logged to sheet");
    } catch (e2) {
      console.error("Failed to write error to sheet:", e2);
    }

    return ContentService.createTextOutput(
      "Error: " + error.toString()
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    "Email collection service is running"
  ).setMimeType(ContentService.MimeType.TEXT);
}

// Test function to manually add data
function testAddData() {
  try {
    console.log("Starting test data addition...");
    const sheetId = "1mWBPoRh049v6pb_eXw3F3QqXI4SLU3HhtmSGlxrsBLE";

    // Try to get the spreadsheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(sheetId);
      console.log("Successfully opened spreadsheet:", spreadsheet.getName());
    } catch (sheetError) {
      console.error("Failed to open spreadsheet:", sheetError);
      throw new Error(
        "Could not open spreadsheet. Please verify the sheet ID and permissions."
      );
    }

    const sheet = spreadsheet.getActiveSheet();
    console.log("Active sheet name:", sheet.getName());
    console.log("Current last row:", sheet.getLastRow());

    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 3).setValues([["Email", "Timestamp", "Date"]]);
      console.log("Headers added");
    }

    const now = new Date();
    const rowData = [
      "test@example.com",
      now.toISOString(),
      now.toLocaleString(),
    ];
    sheet.appendRow(rowData);
    console.log("Test data added successfully:", rowData);
    console.log("New last row:", sheet.getLastRow());
  } catch (error) {
    console.error("Error in testAddData:", error);
    console.error("Error stack:", error.stack);
    throw error;
  }
}
