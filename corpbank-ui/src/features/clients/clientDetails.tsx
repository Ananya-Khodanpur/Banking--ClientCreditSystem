import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { Card, Typography } from "@mui/material";

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    api.get(`/api/clients/${id}`).then(res => setClient(res.data));
  }, [id]);

  if (!client) return null;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6">{client.companyName}</Typography>
      <Typography>Industry: {client.industry}</Typography>
      <Typography>Turnover: ₹{client.annualTurnover} Cr</Typography>
      <Typography>Contact: {client.primaryContact.email}</Typography>
    </Card>
  );
}
