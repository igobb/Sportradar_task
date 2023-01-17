import axios from "axios";
import { useState, useEffect } from "react";
import './Table.css'

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';

export default function TableWithData() {
    const [dataSchedule, setDataSchedule] = useState(null);
    const [dataSeasons, setDataSeasons] = useState(null);
    const [whichSeason, setWhichSeason] = useState('sr:season:77453')
    const [refreshData, setRefreshData] = useState(false);

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

    const colorForEachTeam = (homeScore, awayScore) => {
        if (homeScore || awayScore) {
            if (homeScore > awayScore) {
                return { homeTeamColor: "#367E18", awayTeamColor: "#CF0A0A" };
            } else if (homeScore < awayScore) {
                return { homeTeamColor: "#CF0A0A", awayTeamColor: "#367E18" };
            } else if (homeScore === awayScore) {
                return { homeTeamColor: "#EB5E0B", awayTeamColor: "#EB5E0B" };
            }
        } else {
                if (homeScore === 0 && awayScore === 0) {
                    return { homeTeamColor: "#EB5E0B", awayTeamColor: "#EB5E0B" };
                } else {
                    return 0;
                }
        }
    };

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
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody className='tbody'>
                                {dataSchedule.map((data) => {
                                    const {
                                        sport_event: { competitors, start_time, venue },
                                        sport_event_status: { home_score, away_score, status, period_scores},
                                    } = data;
                                    return (
                                        <tr key={data.sport_event.id}>
                                            <td>
                                                {venue.name}
                                            </td>
                                            <td style={{backgroundColor: colorForEachTeam(home_score, away_score).homeTeamColor, fontWeight: '600'}}>
                                                {competitors[0].name}
                                            </td>
                                            <td style={{backgroundColor: colorForEachTeam(home_score, away_score).awayTeamColor, fontWeight: '600'}}>
                                                {competitors[1].name}
                                            </td>
                                            <td style={{textAlign: 'center', fontWeight: '600'}}>
                                                {status === "postponed" ? status : `${home_score} - ${away_score}`
                                                }
                                            </td>
                                            {period_scores ? (
                                                <td style={{textAlign: 'center'}}>
                                                    {period_scores[0].home_score} - {period_scores[1].away_score}
                                                </td>
                                            ) : (
                                                <td style={{textAlign: 'center'}}>-</td>
                                            )


                                            }
                                            <td>
                                                {start_time.slice(0, 10)}, at {start_time.slice(11, 16)}
                                            </td>
                                            <td>
                                                <Link to="/MatchInfo" state={{ data }} className="table__link">Click for more details</Link>
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