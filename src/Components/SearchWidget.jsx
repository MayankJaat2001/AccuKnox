const WidgetSearch = ({ dashboard }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredWidgets = dashboard.categories.flatMap((category) =>
      category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search Widgets"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          {filteredWidgets.map((widget) => (
            <div key={widget.id}>
              <h3>{widget.name}</h3>
              <p>{widget.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WidgetSearch;
  