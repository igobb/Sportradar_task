import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import './MatchInfo.css';
import Table from 'react-bootstrap/Table';

const MatchInfo = (props) => {
    const [matchData, setMatchData] = useState(null);
    const [matchStatus, setMatchStatus] = useState(null);
    const [timeline, setTimeline] = useState(null);
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
    console.log(matchData)
    console.log(matchStatus)
    console.log(timeline)

    return (
        <>
            {matchData ? <>
                <div className='match-info__container'>
                    <div>
                        <h1><Link className="match-info__link" to="/">Return to home page</Link></h1>
                    </div>
                    <div className="match-info__data">
                        <h2>Match Info</h2>
                        <p>Match beetwen {matchData.competitors[0].name} (Home) vs. {matchData.competitors[1].name} (Away) - {matchStatus.match_status}</p>
                        <div className="match-info__result">
                            <span className="result">{matchStatus.home_score} : {matchStatus.away_score}</span>
                        </div>
                        <div className="match-info__timeline">
                            <h1>Match minute by minute</h1>
                            <Table striped bordered hover responsive>
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
                    </div>

                </div>
            </> : null}
        </>
    );
};

export default MatchInfo;