import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CircularProgress, Backdrop, IconButton, setRef } from "@mui/material";
import CustomGrid from "./CustomGrid";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { toast, Slide } from "react-toastify";
import createFood from "../API/createFoodApi";

function ModifyItem() {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const categories = [{ value: "Veg" }, { value: "Non-Veg" }];
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  // const localDate = new Date();
  const [file, setFile] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnchangeDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleOnchangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleOnchangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleImageFChange = (e) => {
    setFile(e.target.files[0]);
  };

  // method: POST image to cloudinart and return URL 
  const handleImageToCloudinary = async () => {
    if (!file) return null;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
      const res = await axios.post(cloudUrl, formData);
      //console.log(res.data.url);
      return res.data.url;
    } catch (error) {
      console.error("cloudinary upload failed error", error);
      return null;
    }
  };

  // method: Success toast
  const successToast = (msg) => {
        toast.success(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
  };

  // method: Failed toast
  const failedToast = (msg) => {
      toast.error(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
  };

  // method: POST food in server 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uplImag = await handleImageToCloudinary();
      const foodData = {
        name,
        description,
        category,
        price: Number(price),
        // created_date: new Date().toISOString(),
        image: uplImag,
      };
      //await axios.post("http://localhost:3030/foods", foodData);
      await createFood(foodData);
      setRefresh((prev) => !prev);
      successToast("Food added successfully!");
      setOpen(false);
    } catch (error) {
      failedToast("Failed to add food!");
      setOpen(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-t from-green-100 via-green-300 to-gray-200">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          //backgroundColor: "orangered",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            //backgroundColor: "lightblue",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search food.."
            id="fullWidth"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: "20px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              width: 160,
            }}
          >
            Add Foods
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              id="responsive-dialog-title"
              className="flex flex-row justify-between items-center"
            >
              {"Add new Food"}
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <form className="flex flex-col w-100" onSubmit={handleSubmit}>
              <DialogContent
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <TextField
                  label="Name"
                  size="small"
                  required
                  value={name}
                  type="text"
                  onChange={handleOnchangeName}
                  InputLabelProps={{
                    sx: {
                      fontSize: "14px",
                    },
                  }}
                />
                <TextField
                  label="Description"
                  multiline
                  required
                  rows={4}
                  size="small"
                  type="text"
                  onChange={handleOnchangeDesc}
                  value={description}
                  InputLabelProps={{
                    sx: {
                      fontSize: "14px",
                    },
                  }}
                />
                <TextField
                  select
                  label="Category"
                  size="small"
                  required
                  defaultValue=""
                  value={category}
                  type="text"
                  onChange={handleOnchangeCategory}
                  InputLabelProps={{
                    sx: {
                      fontSize: "14px",
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Price"
                  size="small"
                  value={price}
                  type="number"
                  required
                  onChange={handleOnchangePrice}
                  InputLabelProps={{
                    sx: {
                      fontSize: "14px",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    },
                  }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageFChange}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="outlined"
                    component="span"
                    endIcon={<CloudUploadIcon />}
                  >
                    Upload image
                    
                  </Button>
                  {file && (
                      <Typography
                        variant="caption"
                        sx={{ mt: 1, color: "text.secondary" }}
                      >
                        {" "+file.name}
                      </Typography>
                    )}
                </label>
              </DialogContent>
              <DialogActions sx={{display:"flex",justifyContent:"center",gap:6}}>
                <Button size="small" variant="contained" onClick={handleClose}>Close</Button>
                <Button size="small" variant="contained" type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>
          
        </Box>
        
      </Box>
      <CustomGrid refresh={refresh} onRefresh={()=>{setRefresh(prev => !prev)}} />
    </div>
  );
}

export default ModifyItem;
