import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField, Container, Typography, Chip, Button, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ClientList() {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/clients").then(res => setClients(res.data));
  }, []);

  const filtered = clients.filter(c =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">My Clients</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/rm/clients/new")}
        >
          Add Client
        </Button>
      </Box>

      <TextField
        label="Search by name or industry"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Turnover</TableCell>
            <TableCell>Docs</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map(client => (
            <TableRow
              key={client.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/rm/clients/${client.id}`)}
            >
              <TableCell>{client.companyName}</TableCell>
              <TableCell>{client.industry}</TableCell>
              <TableCell>{client.annualTurnover}</TableCell>
              <TableCell>
                <Chip
                  label={client.documentsSubmitted ? "Submitted" : "Pending"}
                  color={client.documentsSubmitted ? "success" : "warning"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
