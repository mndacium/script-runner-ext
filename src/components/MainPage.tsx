import React, { useState, useEffect } from "react";
import Script from "./Script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const { Client } = require("@notionhq/client");

function MainPage() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const [label, setLabel] = useState("");
  const [code, setCode] = useState("");
  const [scripts, setScripts] = useState<{ label: string; code: string }[]>([]);

  useEffect(() => {
    console.log("test");
    const localStorageScripts = JSON.parse(
      localStorage.getItem("scripts") as string
    );
    setScripts(localStorageScripts || []);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newScript = { label, code };
    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    console.log("test");
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));

    setLabel("");
    setCode("");
  };

  const handleEdit = (index: number, newCode: string) => {
    const updatedScripts = [...scripts];
    updatedScripts[index] = { ...updatedScripts[index], code: newCode };
    setScripts(updatedScripts);
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));
  };

  const handleDelete = (index: number) => {
    const updatedScripts = [...scripts];
    updatedScripts.splice(index, 1);
    setScripts(updatedScripts);
    localStorage.setItem("scripts", JSON.stringify(updatedScripts));
  };

  const getNotionPage = () => {
    (async () => {
      const pageId = "59833787-2cf9-4fdf-8782-e53db20768a5";
      const response = await notion.pages.retrieve({ page_id: pageId });
      console.log(response);
    })();
  };

  return (
    <Box className="App" sx={{ width: "600px", padding: "5px 10px" }}>
      <Typography sx={{ marginBottom: "10px" }} fontWeight="500">
        Add new script
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            type="text"
            id="label"
            label="script label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <TextField
            id="code"
            value={code}
            label="code"
            fullWidth
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Box>
        <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">
          Add Script
        </Button>
      </form>
      <Box>
        {scripts.map((script, index) => (
          <Script
            key={index}
            label={script.label}
            code={script.code}
            index={index}
            onEdit={handleEdit}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </Box>

      <Button>123123</Button>
    </Box>
  );
}

export default MainPage;
