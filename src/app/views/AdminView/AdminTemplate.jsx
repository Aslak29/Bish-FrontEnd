import React, { useEffect, useState } from 'react'
import axios from 'axios';
import apiBackEnd from '../../api/backend/api.Backend';
import sortIMG from '../../assets/images/trier.png'
import addIMG from '../../assets/images/add.png'
import loadingSVG from '../../assets/images/loading-spin.svg'
import TableRow from './../../components/admin/TableRow';
import ModalCrud from '../../components/admin/ModalCrud';
import { search, sort } from '../../services/adminServices';
import { Field, Form, Formik } from "formik";
import {  } from '../../constants/urls/urlBackEnd';

const AdminTemplate = () => {
  return (
    <div>AdminTemplate</div>
  )
}

export default AdminTemplate