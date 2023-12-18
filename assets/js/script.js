// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Displaying the date at the header
  var dateSuffix = '';
  var dayDate = dayjs().format('D');
  var lastDigit = dayDate % 10;

  if (lastDigit == 1) {
    dateSuffix = 'st';
  } if (lastDigit == 2) {
    dateSuffix = 'nd';
  } if (lastDigit == 3) {
    dateSuffix = 'rd';
  } if (dayDate >= 11 && dayDate <= 13) {
    dateSuffix = 'th';
  } if (lastDigit == 4,5,6,7,8,9) {
    dateSuffix = 'th';
  }
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate + dateSuffix);

  //Time blocks
  for (var hour = 9; hour <= 17; hour++) {
    var blockId = 'hour-' + hour;
    var block = $('<div>').addClass('row time-block').attr('id', blockId);

    var hourText;
    if (hour === 12) {
      hourText = hour + 'PM';
    } else if (hour > 12) {
      hourText = (hour - 12) + 'PM';
    } else {
      hourText = hour + 'AM';
    }

    var hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hourText);
    var textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save').attr('aria-hidden', true));

    block.append(hourColumn, textArea, saveBtn);

    $('#time-block-container').append(block);
  }

  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });


  //Listener for click events on save button
  $('.saveBtn').click(function () {
    var blockId = $(this).closest('.time-block').attr('id');
    var eventSave = $(this).siblings('.description').val();
    localStorage.setItem(blockId, eventSave);

    eventNotification('Appointment added to localStorage');
  });

  function eventNotification(msg) {
    var notification = $('#notification');
    notification.text(msg).fadeIn();

    setTimeout(function () {
      notification.fadeOut();
    }, 2000);
  }


  



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
