import axios from "axios";
import { useState, useEffect } from "react";
import './Table.css'

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useNavigate} from 'react-router-dom';

export default function TableWithData() {
    const [dataSchedule, setDataSchedule] = useState(null);
    const [dataSeasons, setDataSeasons] = useState(null);
    const [whichSeason, setWhichSeason] = useState('sr:season:77453')
    const [refreshData, setRefreshData] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState()

    const apiSeasonSchedule = `https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/${whichSeason}/schedules.json?api_key=cwy2c5a7sxaeyjspgucjtkgz`;

    const apiCompetitionSeasons = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz";

    useEffect(() => {
        axios
            .get(apiSeasonSchedule)
            .then((res) => {
                setDataSchedule(res.data.schedules);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                    //If the error is in a different range, print it to the console
                } else {
                    console.log(error)
                }
            });
    }, [refreshData]);

    useEffect(() => {
        axios
            .get(apiCompetitionSeasons)
            .then((res) => {
                setDataSeasons(res.data.seasons);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                setErrorData(error)
                if(error.request.status < 600 && error.request.status > 399) {
                    console.log(`${error.message}, error code: ${error.code}`);
                    //If the error is in a different range, print it to the console
                } else {
                    console.log(error)
                }
            });
    }, [refreshData]);

    const handleGoToSubpage = (data) => {
        navigate("/MatchInfo", {
            state: {
                data
            },
        });
    }

    const colorForEachTeam = (homeScore, awayScore) => {
        if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) return 0;
        if (homeScore > awayScore) return { homeTeamColor: "#367E18", awayTeamColor: "#CF0A0A" };
        if (homeScore < awayScore) return { homeTeamColor: "#CF0A0A", awayTeamColor: "#367E18" };
        if (homeScore === awayScore) return { homeTeamColor: "#EB5E0B", awayTeamColor: "#EB5E0B" };
        return 0;
    }
    console.log(dataSchedule)
    return (
        <>
        {loading ? <h1>Loading...</h1> :
            <>
                { (dataSchedule) && (dataSeasons) ? <>
                    <div className="table__container">
                        <Dropdown className="table__container-dropdown">
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Seasons
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {dataSeasons.map((item) => {
                                    return (
                                        <Dropdown.Item
                                            onClick={() => {whichSeason && setWhichSeason(item.id);
                                                setRefreshData(!refreshData)}}
                                            key={item.id}
                                        >
                                            {item.name}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <h1>Selected season: {whichSeason === 'sr:season:77453' ? '2020/2021' : whichSeason === 'sr:season:84320' ? '2021/2022' : '2022/2023'}</h1>
                        <div className='table__container-wrapper'>
                            <Table hover responsive variant='dark'>
                                <thead style={{position: "sticky", top: '0'}}>
                                <tr>
                                    <th>Stadium name</th>
                                    <th colSpan={2}>
                                        <div className="justify-content-between d-flex">
                                            <span>Team Home</span>
                                            <span>vs</span>
                                            <span>Team Away</span>
                                        </div>
                                    </th>
                                    <th>Result</th>
                                    <th>Half time</th>
                                    <th>Match date</th>
                                </tr>
                                </thead>
                                <tbody className='tbody'>
                                {dataSchedule.map((data) => {
                                    return (
                                        <tr key={data.sport_event.id}
                                            onClick={() => handleGoToSubpage(data)}
                                        >
                                            <td>
                                                {data.sport_event.venue.name.replace('Pitkarski', 'Piłkarski')}
                                            </td>
                                            <td style={{backgroundColor: colorForEachTeam(data.sport_event_status.home_score, data.sport_event_status.away_score).homeTeamColor, fontWeight: '600'}}>
                                                {data.sport_event.competitors[0].name}
                                            </td>
                                            <td style={{backgroundColor: colorForEachTeam(data.sport_event_status.home_score, data.sport_event_status.away_score).awayTeamColor, fontWeight: '600'}}>
                                                {data.sport_event.competitors[1].name}
                                            </td>
                                            <td style={{textAlign: 'center', fontWeight: '600'}}>
                                                {data.sport_event_status.status === 'not_started' ? 'Not started yet!' : <>
                                                    {data.sport_event_status.status === "postponed" ? data.sport_event_status.status.replace('p', 'P') : `${data.sport_event_status.home_score} - ${data.sport_event_status.away_score}`
                                                    }
                                                </>}


                                            </td>
                                            {data.sport_event_status.period_scores ? (
                                                <td style={{textAlign: 'center'}}>
                                                    {data.sport_event_status.period_scores[0].home_score} - {data.sport_event_status.period_scores[1].away_score}
                                                </td>
                                            ): (
                                                <td style={{textAlign: 'center'}}>-</td>
                                            )
                                            }
                                            <td>
                                                {data.sport_event.start_time.slice(0, 10)}, at {data.sport_event.start_time.slice(11, 16)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
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
}