 import { 
LOGIN_SELLER_SUCCESS, 
LOGOUT_SELLER_FAILURE,
LOGOUT_SELLER_REQUEST,
LOGOUT_SELLER_SUCCESS
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

