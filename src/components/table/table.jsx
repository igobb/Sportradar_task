import axios from "axios";
import { useState, useEffect } from "react";
import './table.css'

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownItem from "react-bootstrap/DropdownItem";
import {logDOM} from "@testing-library/react";

export default function TableWithData() {
    const [dataSchedule, setDataSchedule] = useState([]);
    const [dataSeasons, setDataSeasons] = useState([]);
    const [whichSeason, setWhichSeason] = useState('sr:season:77453')
    const [refreshData, setRefreshData] = useState(false);

    const apiSeasonSchedule =
        `https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/${whichSeason}/schedules.json?api_key=cwy2c5a7sxaeyjspgucjtkgz`;

    const apiCompetitionSeasons = "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=cwy2c5a7sxaeyjspgucjtkgz";

    useEffect(() => {
        axios
            .get(apiSeasonSchedule)
            .then((res) => {
                setDataSchedule(res.data.schedules);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refreshData]);

    useEffect(() => {
        axios
            .get(apiCompetitionSeasons)
            .then((res) => {
                setDataSeasons(res.data.seasons);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const colorForEachTeam = (homeScore, awayScore) => {
        if (homeScore || awayScore) {
            if (homeScore > awayScore) {
                return { homeTeamColor: "green", awayTeamColor: "red" };
            } else if (homeScore < awayScore) {
                return { homeTeamColor: "red", awayTeamColor: "green" };
            } else if (homeScore === awayScore) {
                return { homeTeamColor: "orange", awayTeamColor: "orange" };
            }
        } else {
                if (homeScore === 0 && awayScore === 0) {
                    return { homeTeamColor: "orange", awayTeamColor: "orange" };
                } else {
                    return 0;
                }
        }
    };

    console.log(dataSeasons)
    return (
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
            <Table bordered hover variant="dark" responsive>
                <thead>
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
                        <th>Half time result</th>
                        <th>Match date</th>
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
                                <td style={{backgroundColor: colorForEachTeam(home_score, away_score).homeTeamColor}}>
                                    {competitors[0].name}
                                </td>
                                <td style={{backgroundColor: colorForEachTeam(home_score, away_score).awayTeamColor}}>
                                    {competitors[1].name}
                                </td>
                                <td>
                                    {status === "postponed" ? status : `${home_score} : ${away_score}`
                                    }
                                </td>
                                {period_scores ? (
                                    <td>
                                        {period_scores[0].home_score} - {period_scores[1].away_score}
                                    </td>
                                ) : (
                                    <td>{status}</td>
                                )


                                }
                                <td>
                                    {start_time.slice(0, 10)}, at {start_time.slice(11, 16)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}