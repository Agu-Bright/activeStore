import React, { Suspense, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const getRandomMovies = (movies, count) => {
  const shuffled = movies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Main = () => {
  const [check, setCheck] = useState(false);
  const query = useSearchParams();
  const balance = query.get("task-id");
  const userId = query.get("userId");
  const { setTask } = useContext(RestaurantContext);
  const [tasks, setTasks] = useState();
  const [cost, setCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const TMDB_API_KEY = "d70595ef3e351a97e5665f2de45fcd45";
    const TMDB_ACCESS_TOKEN =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzA1OTVlZjNlMzUxYTk3ZTU2NjVmMmRlNDVmY2Q0NSIsInN1YiI6IjY2NzA0MWQ0ODRmMDE5YTBlYWExYjcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-M4AqRw0LtobEQ4YQ-eAxJxaSz8ym__7cLqyry-7Uvk";
    const fetchMovies = async () => {
      try {
        const { data: data1 } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              // sort_by: "popularity.desc", // You can modify this to fetch movies based on different criteria
              page: 1, // Fetch the first page of results
            },
          }
        );
        const { data: data2 } = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              // sort_by: "popularity.desc", // You can modify this to fetch movies based on different criteria
              page: 2, // Fetch the first page of results
            },
          }
        );
        const combinedResults = [...data1.results, ...data2.results];

        const randomMovies = getRandomMovies(combinedResults, 25);
        console.log(randomMovies);
        const movieData = randomMovies.map((movie) => ({
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
          price: "",
          commision: "",
        }));
        console.log(movieData);
        setTasks(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleChangeP = (e, name) => {
    //find the task
    // const theTask = tasks.find((item) => item?.name === name);
    //updaet its value based on name
    setTasks((prev) => {
      // Find the index of the task to be updated
      const taskIndex = prev.findIndex((item) => item?.name === name);

      if (taskIndex !== -1) {
        // Create a new task object with updated properties
        const updatedTask = {
          ...prev[taskIndex],
          price: e.target.value,
        };
        // Create a new array with the updated task
        const updatedTasks = [
          ...prev.slice(0, taskIndex),
          updatedTask,
          ...prev.slice(taskIndex + 1),
        ];

        return updatedTasks;
      } else {
        console.error("Task not found");
        return prev; // or handle as needed if the task is not found
      }
    });
  };
  const handleChangeC = (e, name) => {
    //find the task
    //updaet its value based on name
    setTasks((prev) => {
      // Find the index of the task to be updated
      const taskIndex = prev.findIndex((item) => item?.name === name);

      if (taskIndex !== -1) {
        // Create a new task object with updated properties
        const updatedTask = {
          ...prev[taskIndex],
          commision: e.target.value,
        };
        // Create a new array with the updated task
        const updatedTasks = [
          ...prev.slice(0, taskIndex),
          updatedTask,
          ...prev.slice(taskIndex + 1),
        ];

        return updatedTasks;
      } else {
        console.error("Task not found");
        return prev; // or handle as needed if the task is not found
      }
    });
  };

  const calculate = (tasks) => {
    console.log("handling");
    if (!tasks) {
      toast.error("Bro!! Chill out", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    let totalCost = 0;
    let totalProfit = 0;

    tasks.forEach((item) => {
      const price = Number(item.price) + Number(totalCost);
      const profit = Number(item.commision) + Number(totalProfit);
      totalCost = price;
      totalProfit = profit;
    });
    console.log(totalCost);
    console.log(totalProfit);
    setCost(totalCost);
    setProfit(totalProfit);
    if (totalCost < balance) {
      toast.error("Cost is lower than the users balance", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    setCheck(true);
    toast.success("Task Assignment is Valid", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const getColor = (cost) => {
    if (cost > balance) {
      return "green";
    } else return "red";
  };

  const handleTaskAssign = async () => {
    if (!userId) {
      toast.error("No user id", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      // const promises = tasks.map(async (task) => {
      //   return axios.post("/api/task/assign", { ...task, user: userId });
      // });

      setTasks((prev) => {
        const newPrev = prev.map((item) => {
          return { ...item, user: userId };
        });
        return newPrev;
      });

      await axios.post("/api/task/assign", {
        tasks: tasks,
        user: userId,
      });

      // Wait for all promises to resolve{}
      // await Promise.all(promises);

      toast.success("All Tasks Assigned successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/dashboard/manage-tasks");
    } catch (error) {
      toast.error("Error Assigning Tasks", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div id="price">
      <p style={{ fontSize: "1.2em", fontWeight: "800" }}>
        User Balance: <span style={{ color: "green" }}>${balance || 0}</span>{" "}
      </p>
      <p style={{ fontSize: "1.2em", fontWeight: "800" }}>
        Task Cost: <span style={{ color: getColor(cost) }}>${cost}</span>{" "}
      </p>
      <p style={{ fontSize: "1.2em", fontWeight: "800" }}>
        User Profit: <span style={{ color: "red" }}>${profit}</span>{" "}
      </p>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {tasks &&
          tasks.map((item, index) => (
            <Grid
              item
              key={index}
              xs={6}
              md={2}
              sm={4}
              sx={{ marginTop: "10px" }}
            >
              <div
                style={{
                  minHeight: "400px",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    className="movie_image"
                    src={item.image}
                    alt={item.name}
                  />
                  <Typography sx={{ fontWeight: "800", color: "black" }}>
                    {item.name}
                  </Typography>
                </div>
                <Stack direction="row" justifyContent="space-between">
                  <input
                    style={{
                      width: "45%",
                      fontSize: "10px",
                      borderRadius: "5px",
                    }}
                    type="number"
                    name="price"
                    value={item?.price}
                    placeholder="Price"
                    onChange={(e) => handleChangeP(e, item?.name)}
                  />
                  <input
                    style={{
                      width: "45%",
                      fontSize: "10px",
                      borderRadius: "5px",
                    }}
                    type="number"
                    value={item?.commision}
                    placeholder="commision"
                    onChange={(e) => handleChangeC(e, item?.name)}
                    name="commision"
                  />
                </Stack>
              </div>
            </Grid>
          ))}
      </Grid>
      <Stack sx={{ margin: "50px 0px" }}>
        <button
          onClick={() => calculate(tasks)}
          style={{ border: "none", background: "green", borderRadius: "5px" }}
        >
          <a href="#price" style={{ color: "white" }}>
            Check
          </a>
        </button>
      </Stack>
      {check && (
        <Stack sx={{ margin: "50px 0px" }}>
          <button
            onClick={() => handleTaskAssign()}
            style={{
              border: "none",
              background: "orange",
              borderRadius: "5px",
            }}
          >
            <a href="#price" style={{ color: "white" }}>
              Assign Tasks
            </a>
          </button>
        </Stack>
      )}
    </div>
  );
};

const Tasks = () => {
  return (
    <Suspense
      fallback={
        <div style={{ width: "100%", height: "70v" }}>Fetching Tickets ...</div>
      }
    >
      <Main />
      <ToastContainer />
    </Suspense>
  );
};

export default Tasks;
