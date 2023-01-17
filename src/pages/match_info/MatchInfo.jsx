import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import './MatchInfo.css'
import Table from 'react-bootstrap/Table';

const MatchInfo = (props) => {
    const [matchData, setMatchData] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState(null);
    const location = useLocation();
    const data = location.state?.data;
    const id = data.sport_event.id

    const apiMatchInfo = `https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=cwy2c5a7sxaeyjspgucjtkgz`;

    useEffect(() => {
        axios
            .get(apiMatchInfo)
            .then((res) => {
                setMatchData(res.data.sport_event);
                setMatchStatus(res.data.sport_event_status)
                setTimeline(res.data.timeline)
                setLoading(false)
            })
            .catch((error) => {
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                    //If the error is in a different range, print it to the console
                } else {
                    console.log(error)
                }
            });
    }, []);

    return (
        <>
            {loading ? <h1>Loading...</h1> : <>
                {matchData ?
                    <>
                        <div className='match-info__container'>
                            <div className='match-info__link-wrapper'>
                                <Link className="match-info__link" to="/"><button className='match-info__link-button'>Return to home page</button></Link>
                            </div>
                            <div className="match-info__data">
                                <div className="data-wrapper">
                                    <div className='home'>
                                        <span>{matchData.competitors[0].name}</span>
                                        <p>(Home)</p>
                                    </div>
                                    {matchStatus.status === 'postponed' ?
                                        <div className="match-info__postponed">
                                            {matchStatus.status}
                                            <span className="result"> - </span>
                                            <p>{matchData.venue.name}</p>
                                            <p>{matchData.sport_event_context.competition.name}</p>
                                        </div>
                                        :
                                        <div className="match-info__result">
                                            <span className="result">{matchStatus.home_score} - {matchStatus.away_score}</span>
                                            <p>{matchData.venue.name}</p>
                                            <p>{matchData.start_time.slice(0, 10)}</p>
                                            <p>{matchData.sport_event_context.competition.name}</p>
                                        </div>
                                    }
                                    <div className="away">
                                        <span>{matchData.competitors[1].name}</span>
                                        <p>(Away)</p>
                                    </div>
                                </div>
                                {matchStatus.status === 'postponed' ? null :
                                    <div className="match-info__timeline">
                                        <h2>Match minute by minute</h2>
                                        <Table striped bordered hover responsive variant='dark'>
                                            <thead>
                                            <tr>
                                                <th>Minute</th>
                                                <th>Event</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {timeline.map((event) => {
                                                return (
                                                    <tr>
                                                        <td>{event.match_time ? event.match_time + '\'' : event.time.slice(11, 16)}</td>
                                                        <td>{ event.type.replace('_', ' ').replace('_', ' ') }</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <div className="error">
                        {errorData ?
                            <>
                                <h1>Sorry, we have a problem...</h1>
                                <p>{errorData?.message}</p>
                            </>: null
                        }
                    </div>
                }
            </>
            }
        </>
    );
};

export default MatchInfo;