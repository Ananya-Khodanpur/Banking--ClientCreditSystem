import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Container, Typography, Chip
} from "@mui/material";

export default function CreditRequestList() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/credit-requests").then(res => setRequests(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h6">Credit Requests</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Tenure</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {requests.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.clientId}</TableCell>
              <TableCell>{r.requestAmount}</TableCell>
              <TableCell>{r.tenureMonths} months</TableCell>
              <TableCell>
                <Chip
                  label={r.status}
                  color={
                    r.status === "APPROVED"
                      ? "success"
                      : r.status === "REJECTED"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
