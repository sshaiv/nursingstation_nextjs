import axios from "axios";
import API_ENDPOINTS from "../constants/api_url";

export const fetchInvestigationDetails = async (visitid) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.getInvDetail}/?visitid=${visitid}`);

    let parsedData = [];

    if (typeof response.data === "string") {
      parsedData = JSON.parse(response.data);
    } else if (
      typeof response.data === "object" &&
      typeof response.data.data === "string"
    ) {
      parsedData = JSON.parse(response.data.data);
    } else {
      parsedData = response.data;
    }

    return parsedData?.Table || [];
  } catch (error) {
    console.error("Error fetching investigations:", error);
    return [];
  }
};
