import { useState } from "react";
import useFetch from "../Customhook/useFetch";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CircularProgress, Backdrop, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import updateFoodApi from "../API/updateFoodApi";
import deleteFoodApi from "../API/deleteFoodApi";

const CustomGrid = ({ refresh, onRefresh }) => {
  let { loading, error, foods } = useFetch(
    "http://localhost:3030/foods",
    refresh,
  );
  //console.log(foods.length);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const [updateLoder, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [sure, setSure] = useState(false);
  const [selectedFoodToDelete, setSelectedFoodToDelete] = useState(null);

  const categories = [{ value: "Veg" }, { value: "Non-Veg" }];

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
  const handleUpdateImageFChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSure = (e) => {
    setSure(false);
  };
  const handleDeleteFood = (food) => {
    setSelectedFoodToDelete(food);
    setSure(true);
  };

  const handleEditFood = (food) => {
    setSelectedFood(food);
    setName(food.name);
    setDescription(food.description);
    setCategory(food.category);
    setPrice(food.price);
    //setFile()
    setOpen(true);
    //console.log(selectedFood);
  };

  // success toast method
  const successToast = (msg) => {
    toast.success(msg, {
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

  // failed toast method
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

  // update image to cloudinary and return URL mthod
  const updateImageCloudinary = async () => {
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
      return res.data.url;
    } catch (e) {
      console.error("cloudinary upload failed error", e);
      return null;
    }
  };

  // form update method
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoader(true);

    try {
      if (file != null) {
        const url = await updateImageCloudinary();
        const foodData = {
          ...selectedFood,
          name,
          description,
          category,
          price,
          image: url,
        };
        // await axios.put(
        //   `http://localhost:3030/foods/${selectedFood.id}`,
        //   foodData
        // );

        await updateFoodApi(`foods/${selectedFood.id}`, foodData);

        successToast("Food updated successfully!");
        onRefresh();
        setOpen(false);
      } else {
        const foodData = {
          ...selectedFood,
          name,
          description,
          category,
          price,
        };
        // await axios.put(
        //   `http://localhost:3030/foods/${selectedFood.id}`,
        //   foodData
        // );
        await updateFoodApi(`foods/${selectedFood.id}`, foodData);
        successToast("Food updated successfully !");
        onRefresh();
        setOpen(false);
      }
    } catch (updateError) {
      failedToast("Failed to update food !");
      setOpen(false);
      setUpdateError(true);
    } finally {
      setUpdateLoader(false);
    }
  };

  // delete method
  const handleDeleteSure = async () => {
    setDeleteLoader(true);
    try {
      // await axios.delete(
      //   `http://localhost:3030/foods/${selectedFoodToDelete.id}`
      // );
      await deleteFoodApi(`foods/${selectedFoodToDelete.id}`);
      successToast("Food deleted successfully!");
      onRefresh();
      setSure(false);
    } catch (error) {
      failedToast("Failed to delete food!");
      setSure(false);
      setDeleteError(true);
      // console.error(error);
    } finally {
      setDeleteLoader(false);
    }
  };

  if (loading) {
    // if loading loader symbol
    return (
      <center>
        <div className="flex justify-center items-center min-h-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </center>
    );
  } else {
    return (
      <div className="pl-2 pr-2">
        {foods.length != 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* iterate food cards */}
            {foods.map((food) => (
              <Card
                key={food.id}
                className="flex flex-col justify-between"
                sx={{
                  maxWidth: 250,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  padding: "8px 8px 0px 8px",
                }}
              >
                <CardMedia
                  sx={{
                    height: 100,
                    width: 232,
                    borderRadius: "16px",
                  }}
                  //image="/static/images/cards/contemplative-reptile.jpg"
                  image={food.image}
                  title={food.name}
                />
                <CardContent className="flex flex-col grow">
                  <Typography gutterBottom variant="h5" component="div">
                    {food.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {food.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <span className="font-bold">{"Price: ₹" + food.price}</span>
                  </Typography>
                </CardContent>
                <CardActions className="    flex flex-row justify-evenly">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleEditFood(food);
                    }}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      borderRadius: "10px",
                      border: "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#1976d2",
                        borderColor: "#1976d2",
                      },
                      "&:active": {
                        backgroundColor: "#115293",
                        transform: "scale(0.97)",
                      },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleDeleteFood(food);
                    }}
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "10px",
                      border: "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "red",
                        borderColor: "red",
                      },
                      "&:active": {
                        backgroundColor: "#b71c1c",
                        transform: "scale(0.97)",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}

            {/* Are you sure want to delete? Dialog Box */}
            <Dialog open={sure} onClose={handleSure}>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.modal + 1,
                }}
                open={deleteLoader}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <DialogContent className="bg-green-400 font-bold ">
                {"Are you sure want to delete?"}
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  onClick={handleDeleteSure}
                  size="small"
                  variant="contained"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setSure(false)}
                  size="small"
                  variant="contained"
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>

            {/* update food form */}
            <Dialog
              open={open}
              onClose={handleClose}
              BackdropProps={{
                sx: {
                  backgroundColor: "rgba(0,0,0,0.2)", // lighter dim
                },
              }}
            >
              <DialogTitle
                id="responsive-dialog-title"
                className="flex flex-row justify-between items-center"
              >
                {"Update Food"}
                <IconButton onClick={handleClose} size="small">
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.modal + 1,
                }}
                open={updateLoder}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <form className="flex flex-col w-100" onSubmit={handleUpdate}>
                <DialogContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
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
                    onChange={handleUpdateImageFChange}
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
                        {" " + file.name}
                      </Typography>
                    )}
                  </label>
                </DialogContent>
                <DialogActions
                  sx={{ display: "flex", justifyContent: "center", gap: 8 }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button size="small" variant="contained" type="submit">
                    Update
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </section>
        )}
        {error && <p>{"Hi" + error}</p>}
      </div>
    );
  }
};

export default CustomGrid;
