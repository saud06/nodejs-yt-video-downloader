/*
 * Title: Youtube Video Downloader
 * Description: A simple Node JS library to download videos from YouTube
 * Author: Saud M.
 * Github: https://github.com/saud06
 * LinkedIn: https://www.linkedin.com/in/saud06
 */

// eslint-disable-next-line func-names
(function ($) {
  const app = [];

  app.checkUrl = (checkURL) => {
    // eslint-disable-next-line no-useless-escape
    const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (regexp.test(checkURL)) {
      return true;
    }

    return false;
  };

  $('.error-text, #video-download').hide();

  $('#download-button').on('click', () => {
    const url = $('.download-input').val();

    $('.download-view').hide();
    $('.loader-icon-view').show();

    // if check valid URL & not empty
    if (url !== '' && app.checkUrl(url) === true) {
      $('.error-text').hide();
      $('#video-download').show();

      $.ajax({
        method: 'POST',
        url: '/',
        data: { url },
      })
        .done((data) => {
          $('.download-view').show();
          $('.loader-icon-view').hide();

          // Reset result view
          $('.videoAudioLink, .videoLink, .audioLink').html('');

          app.updateContent(data);
          app.downloadLink(data);
        });
    } else {
      $('.error-text').show();
    }
  });

  app.updateContent = (data) => {
    $('.thumb-img').attr('src', data.player_response.videoDetails.thumbnail.thumbnails[2].url);
    $('.title').text(data.title);

    // Convert sec to min
    const lengthMin = data.length_seconds / 60;

    $('.duration').text(lengthMin.toFixed(2));
  };

  app.downloadLink = (data) => {
    const dataLength = data.formats.length;

    for (let count = 0; count < dataLength; count += 1) {
      // Video And Audio Format
      if (data.formats[count].resolution !== null && data.formats[count].audioBitrate !== null) {
        $('.videoAudioLink').append('<tr class="table-light">'
        + `<td>${data.formats[count].quality.toUpperCase()}</td>`
        + `<td>${(data.formats[count].container).toUpperCase()}</td>`
        + `<td><a download="${data.title}.${data.formats[count].container}" href="${data.formats[count].url}&amp;title=${encodeURI(data.title)}" href="javascript:void(0);"><button type="button" class="btn btn-light">Download</button></a></td>`
      + '</tr>');
      }

      // Video Format Only
      if (data.formats[count].resolution !== null && data.formats[count].audioBitrate === null) {
        $('.videoLink').append('<tr class="table-light">'
        + `<td>${data.formats[count].quality.toUpperCase()}</td>`
        + `<td>${(data.formats[count].container).toUpperCase()}</td>`
        + `<td><a download="${data.title}.${data.formats[count].container}" href="${data.formats[count].url}&amp;title=${encodeURI(data.title)}"><button type="button" class="btn btn-light">Download</button></a></td>`
      + '</tr>');
      }

      // Audio Format Only
      if (data.formats[count].qualityLabel === null && data.formats[count].audioBitrate !== null) {
        $('.audioLink').append('<tr class="table-light">'
        + `<td>${data.formats[count].audioBitrate} Kbps</td>`
        + `<td>${(data.formats[count].container).toUpperCase()}</td>`
        + `<td><a download="${data.title}.${data.formats[count].container}" href="${data.formats[count].url}&amp;title=${encodeURI(data.title)}"><button type="button" class="btn btn-light">Download</button></a></td>`
      + '</tr>');
      }
    }
  };

  $('.scroll-down').on('click', () => {
    $('#video-download').hide();
    $('html, body').animate({
      scrollTop: (670),
    }, 1000, 'easeInOutExpo');
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(() => {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 50,
  });
// eslint-disable-next-line no-undef
}(jQuery));
