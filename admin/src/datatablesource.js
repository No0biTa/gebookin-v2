export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 300, // Increased width for better visibility
    renderCell: (params) => {
      return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {params.row.desc}
          </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => {
      // Format the price as Indonesian Rupiah
      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(params.value);

      return <span>{formattedPrice}</span>;
    }
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
