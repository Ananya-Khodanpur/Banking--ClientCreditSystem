import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Container, Typography, Switch, Stack } from "@mui/material";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/admin/users").then(res => setUsers(res.data));
  }, []);

  const toggleStatus = async (id: string, active: boolean) => {
    await api.put(`/api/admin/users/${id}/status`, { active });
    setUsers(users.map(u =>
      u.id === id ? { ...u, active } : u
    ));
  };

  return (
    <Container>
      <Typography variant="h6" mb={2}>
        User Management
      </Typography>

      {users.map(user => (
        <Stack
          key={user.id}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <span>
            {user.username} ({user.role})
          </span>

          <Switch
            checked={user.active}
            onChange={(e) => toggleStatus(user.id, e.target.checked)}
          />
        </Stack>
      ))}
    </Container>
  );
}
