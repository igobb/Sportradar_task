import axios from "axios";
import { useState, useEffect } from "react";

import Table from 'react-bootstrap/Table';

const api =
    "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=cwy2c5a7sxaeyjspgucjtkgz";

export default function TableWithData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(api)
            .then((res) => {
                setData(res.data.schedules);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Team Names</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data) => {
                        const {
                            sport_event: { competitors },
                            sport_event_status: { home_score, away_score, status },
                        } = data;
                        return (
                            <tr key={data.sport_event.id}>
                                <td>
                                    {competitors[0].name} v. {competitors[1].name}
                                </td>
                                <td>
                                    {status === "postponed" ? status : `${home_score} : ${away_score}`
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}