import React, { Component } from 'react'
import api from 'axios'

import './styles.css'

export default class Feed extends Component {
    state = {
        channels: [],
        videos: []
    }

    componentDidMount() {
        this.loadYoutubeChannels()
    }

    loadYoutubeChannels = () => {
        const channelsIds = ['UC-bj2tl2Zjdh-aHnewSrbxw', 'UCSfwM5u0Kce6Cce8_S72olg', 'UCFuIUoyHB12qpYa8Jpxoxow', 'UCU5JicSrEM5A63jkJ2QvGYw', 'UCZGKD_HFC4H1WuPf0ZmWgOg']

        channelsIds.map(async (channel) => {
            const response = await api.get(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`)
            const { title } = response.data.feed
            const { items } = response.data

            this.setState({ channels: [...this.state.channels, title], videos: [...this.state.videos, items.slice(0, 4)] })
        })
    }

    render() {
        const { channels } = this.state
        const { videos } = this.state

        return (
            <div className="feeds">
                {channels.map((channel, index) => (
                    <div className="feed" key={channel} >
                        <h1>{channel}</h1>
                        <div className="feed_videos">
                            {videos[index].map(video => (
                                <div className="video_content" key={video.link}>
                                    <a href={video.link} target="_blank" rel="noopener">
                                        <img src={video.thumbnail.replace('hqdefault.jpg', 'mqdefault.jpg')} alt={video.title} />
                                        <div className="feed_info">
                                            <p>{video.author}</p>
                                            <h1>{video.title}</h1>
                                            <p>{video.pubDate}</p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }
} 