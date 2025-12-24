import { useEffect } from "react";
import { Container, Typography, List, ListItem, ListItemButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCreditRequests } from "./creditSlice";
import { useNavigate } from "react-router-dom";

export default function CreditRequestList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requests = useAppSelector((state) => state.credit.list);

  useEffect(() => {
    dispatch(fetchCreditRequests());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h5" mt={3}>
        Credit Requests
      </Typography>

      <List>
        {requests.map((r) => (
          <ListItem key={r.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/credit-requests/${r.id}`)}>
              ₹{r.requestAmount} — {r.status}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
