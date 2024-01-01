$(document).ready(function() {
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Function to retrieve stored values from local storage and set them to the input fields
  function loadStoredValues() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var storedValue = localStorage.getItem(timeBlockId);

      if (storedValue) {
        $(this).find(".description").val(storedValue);
      }
    });
  }

  // Call the function to load stored values when the page loads
  loadStoredValues();

  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);

    console.log("Save button clicked!");
  });

  $(".time-block").each(function () {
    var currentHour = dayjs().hour();
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
});
