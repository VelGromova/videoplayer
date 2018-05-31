import * as helpers from './../../src/modules/helpers'
import {expect} from 'chai'

describe('Helper functions', () => {
  it('Should return correct generated html string with video data', () => {
  let expectedResult = '<li class="video__info__container eg-flexCenter eg-justifyContentCenter">' +
    '<div class="tooltip">link</div>' +
    '<div class="video__info video__id">1</div>' +
    '<div class="video__info video__title">title</div>' +
    '<div class="video__info video__author">author</div>' +
    '<div class="video__info video__control eg-flex">' +
    '<span class="video__play icon icon-play" videoId="1"></span>' +
    '<span class="video__delete icon icon-delete" videoId="1"></span>' +
    '</div>' +
    '</li>'
  let result = helpers.fillHtmlWithVideoData({
    id: 1,
    author: 'author',
    title: 'title',
    link: 'link'
  })

    expect(result).to.equal(expectedResult)
  })

  it('Should get correct video id from youtube url', () => {
    let expectedId = '1p3vcRhsYGo'

    let urls = [
      '//www.youtube-nocookie.com/embed/1p3vcRhsYGo?rel=0',
      'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&feature=channel',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&playnext_from=TL&videos=osPknwzXEas&feature=sub',
      'http://www.youtube.com/ytscreeningroom?v=1p3vcRhsYGo',
      'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/1p3vcRhsYGo',
      'http://youtu.be/1p3vcRhsYGo',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&feature=youtu.be',
      'http://youtu.be/1p3vcRhsYGo',
      'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&feature=channel',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&playnext_from=TL&videos=osPknwzXEas&feature=sub',
      'http://www.youtube.com/ytscreeningroom?v=1p3vcRhsYGo',
      'http://www.youtube.com/embed/1p3vcRhsYGo?rel=0',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo',
      'http://youtube.com/v/1p3vcRhsYGo?feature=youtube_gdata_player',
      'http://youtube.com/vi/1p3vcRhsYGo?feature=youtube_gdata_player',
      'http://youtube.com/?v=1p3vcRhsYGo&feature=youtube_gdata_player',
      'http://www.youtube.com/watch?v=1p3vcRhsYGo&feature=youtube_gdata_player',
      'http://youtube.com/?vi=1p3vcRhsYGo&feature=youtube_gdata_player',
      'http://youtube.com/watch?v=1p3vcRhsYGo&feature=youtube_gdata_player',
      'http://youtube.com/watch?vi=1p3vcRhsYGo&feature=youtube_gdata_player',
      'http://youtu.be/1p3vcRhsYGo?feature=youtube_gdata_player',
      '1p3vcRhsYGo'
    ]

    urls.forEach(url => expect(helpers.getVideoIdFromYoutubeUrl(url)).to.equal(expectedId))
  })
})
