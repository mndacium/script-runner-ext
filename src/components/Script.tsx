import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getCurrentTab } from "./getCurrentTab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface Props {
  label: string;
  code: string;
  index: number;
  onEdit: (index: number, newCode: string) => void;
  onDelete: () => void;
}

function Script({ label, code, index, onEdit, onDelete }: Props) {
  const [codeFormValue, setCodeFormValue] = useState<string>(code);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const runScript = async () => {
    try {
      const tabId = await getCurrentTab();
      chrome.scripting.executeScript({
        target: {
          tabId: tabId as number,
        },
        func: (code: string) => {
          setTimeout(code, 0);
        },
        args: [code],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    onEdit(index, codeFormValue);
    setIsEditing(false);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <div>
        <Typography fontWeight="600">{label}</Typography>
        {isEditing ? (
          <TextField
            id="code"
            value={codeFormValue}
            label="code"
            fullWidth
            onChange={(e) => setCodeFormValue(e.target.value)}
            required
          ></TextField>
        ) : (
          <Typography
            sx={{
              marginTop: "10px",
              border: "1px solid black",
              borderRadius: "4px",
              padding: "5px 10px",
            }}
          >
            {code}
          </Typography>
        )}

        <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
          <Button variant="contained" onClick={runScript}>
            Run Script
          </Button>
          {isEditing ? (
            <Button variant="contained" onClick={handleEdit}>
              Confirm changes
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}

          <Button variant="contained" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

export default Script;
