import * as video from './../../src/modules/video'
import { expect } from 'chai'
import 'mock-local-storage'

describe('CRUD of video data', () => {
  afterEach(() => {
  localStorage.clear();
  localStorage.itemInsertionCallback = null;
})

  it('Should return "id", when add new video data', () => {
    let testData = {
      author: 'Some Author',
      title: 'Some title',
      link: 'some-link'
    }

    expect(video.addVideo(testData)).to.equal(1)

    testData.author = 'Another author'
    expect(video.addVideo(testData)).to.equal(2)
  })

  it('Should return -1 when try to add existed video', () => {
    let testData = {
      author: 'Some Author',
      title: 'Some title',
      link: 'some-link'
    }

    expect(video.addVideo(testData)).to.equal(1)
    expect(video.addVideo(testData)).to.equal(-1)
  })

  it('Should return array of videos existed in localStorage', () => {
    let testData = [
      {
        author: 'Some Author 1',
        title: 'Some title 1',
        link: 'some-link1'
      },
      {
        author: 'Some Author 2',
        title: 'Some title 2',
        link: 'some-link2'
      },
      {
        author: 'Some Author 3',
        title: 'Some title 3',
        link: 'some-link3'
      }
    ]

    let expectedResult = [
      {
        id: 1,
        author: 'Some Author 1',
        title: 'Some title 1',
        link: 'some-link1'
      },
      {
        id: 2,
        author: 'Some Author 2',
        title: 'Some title 2',
        link: 'some-link2'
      },
      {
        id: 3,
        author: 'Some Author 3',
        title: 'Some title 3',
        link: 'some-link3'
      }
    ]

    testData.forEach(videoInfo => video.addVideo(videoInfo))
    expect(video.getVideos()).to.deep.equal(expectedResult)
  })

  it('Should correct delete video data by id', () => {
    let testData = [
      {
        author: 'Some Author 1',
        title: 'Some title 1',
        link: 'some-link1'
      },
      {
        author: 'Some Author 2',
        title: 'Some title 2',
        link: 'some-link2'
      },
      {
        author: 'Some Author 3',
        title: 'Some title 3',
        link: 'some-link3'
      }
    ]

      testData.forEach(videoInfo => video.addVideo(videoInfo))
      expect(video.removeVideo(1)).to.equal(true)
      expect(video.removeVideo(1)).to.equal(false)

      expect(video.removeVideo('2')).to.equal(true)
      expect(video.removeVideo('2')).to.equal(false)
    })

    it('Should correct find video data by id', () => {
      let testData = [
        {
          author: 'Some Author 1',
          title: 'Some title 1',
          link: 'some-link1'
        },
        {
          author: 'Some Author 2',
          title: 'Some title 2',
          link: 'some-link2'
        },
        {
          author: 'Some Author 3',
          title: 'Some title 3',
          link: 'some-link3'
        }
      ]

    let expectedResult = {
      id: 1,
      author: 'Some Author 1',
      title: 'Some title 1',
      link: 'some-link1'
    }

    testData.forEach(videoInfo => video.addVideo(videoInfo))
    expect(video.findVideo(1)).to.deep.equal(expectedResult)
    expect(video.findVideo('1')).to.deep.equal(expectedResult)
    expect(video.findVideo('10')).to.deep.equal({})
  })
})
