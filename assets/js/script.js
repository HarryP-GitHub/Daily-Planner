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
  } else {
    dateSuffix = 'th';
  }
  
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate + dateSuffix);

  //Time blocks
  for (var hour = 9; hour <= 17; hour++) {
    var blockId = 'hour-' + hour;
    var block = $('<div>').addClass('row time-block').attr('id', blockId);

    // adding if it is PM or AM behind the hour
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

  // for Past, present and future different colours
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


  //Listener for click events on save button and notification when the save button is clicked
  $('.saveBtn').click(function () {
    var blockId = $(this).closest('.time-block').attr('id');
    var eventSave = $(this).siblings('.description').val();
    localStorage.setItem(blockId, eventSave);

    eventNotification('Event added to Local Storage');
  });

  function eventNotification(msg) {
    var notification = $('#notification');
    notification.text(msg).fadeIn();

    setTimeout(function () {
      notification.fadeOut();
    }, 2000);
  }

  // Local Storage -> refresh the page and event will be saved
  $('.time-block').each(function () {
    var blockId = $(this).attr('id');
    var savedEvent = localStorage.getItem(blockId);
    if (savedEvent !== null) {
      $(this).find('.description').val(savedEvent);
    }
  });

});
