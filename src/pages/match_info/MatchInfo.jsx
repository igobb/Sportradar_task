import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import './MatchInfo.css'
import Table from 'react-bootstrap/Table';
import Error from '../../components/error/Error';

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
                } else {
                    console.log(error)
                }
            });
    }, []);

    const getMatchStartedStatus = (matchStatus, matchData) => {
        return <div className="match-info__not-started">
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p className="not-started__p">The match will start: <br/> {matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getEndedMatchStatus = (matchStatus, matchData) => {
        return  <div className="match-info__result">
            <span className="result">{matchStatus.home_score} - {matchStatus.away_score}</span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getPostponedMatchStatus = (matchStatus, matchData) => {
        return <div className="match-info__postponed">
            Match {matchStatus.status}
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p style={{textDecoration: 'line-through', textDecorationThickness: '.2rem'}}>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    const getCancelledMatchStatus = (matchStatus, matchData) => {
        return <div className="match-info__cancelled">
            Match {matchStatus.status}
            <span className="result"> - </span>
            <p>{data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}</p>
            <p style={{textDecoration: 'line-through', textDecorationThickness: '.2rem'}}>{matchData.start_time.slice(0, 10)}</p>
            <p>{matchData.sport_event_context.competition.name}, round {matchData.sport_event_context.round.number}</p>
        </div>;
    }

    return (
        <>
            {loading ? <h1>Loading...</h1> : <>
                {matchData ?
                    <>
                        <div className='match-info__container'>
                            <div className='match-info__link-wrapper'>
                                <Link className="match-info__link" to="/Sportradar_task"><button className='match-info__link-button'>Return to home page</button></Link>
                            </div>
                            <div className="match-info__data">
                                <div className="data-wrapper">
                                    <div className='home'>
                                        <span>{matchData.competitors[0].name}</span>
                                        <p>(Home)</p>
                                    </div>
                                    {matchStatus.status === 'not_started' ? getMatchStartedStatus(matchStatus, matchData)
                                        :
                                        <>
                                            {matchStatus.status === 'postponed' ? getPostponedMatchStatus(matchStatus, matchData)
                                                :
                                                matchStatus.status === 'cancelled' ? getCancelledMatchStatus(matchStatus, matchData)
                                                    :
                                                    getEndedMatchStatus(matchStatus, matchData)
                                            }
                                        </>
                                    }
                                    <div className="away">
                                        <span>{matchData.competitors[1].name}</span>
                                        <p>(Away)</p>
                                    </div>
                                </div>
                                {matchStatus.status === 'closed' &&
                                    <div className="match-info__timeline">
                                        <h2>Match minute by minute</h2>
                                        <Table striped bordered hover responsive variant='dark' className="match-info__table">
                                            <thead>
                                            <tr>
                                                <th>Minute</th>
                                                <th>Event</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {timeline.map((event) => {
                                                return (
                                                    <tr key={event.id}>
                                                        <td>{event.match_time ? event.match_time + '\'' : event.time.slice(11, 16)}</td>
                                                        <td>{event.type[0].toUpperCase() + event.type.replace(/_/g, ' ').substring(1)}</td>
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
                    <Error errorData={errorData}></Error>
                }
            </>
            }
        </>
    );
};

export default MatchInfo;