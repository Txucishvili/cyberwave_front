import {
  Button,
  Classes,
  Dialog,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import FilterLine from "@components/Shared/filterLine";
import {
  FilterList,
  FilterListArray,
} from "@components/Shared/filterLine/filterLine";
import { useFilterLineContext } from "@components/Shared/filterLine/filterLine.context";
import BlockEl from "@components/utils/BlockEl";
import { useAppSelector } from "@store/redux";
import { myAsyncInSlice } from "@store/redux/Slices/games-page.store";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./GamesPage.scss";
import HeadingSlider from "./headingSlider";
import { Popover2 } from "@blueprintjs/popover2";

const GamesPageFilters: FilterListArray[] = [
  {
    label: "ჟანრი",
    value: "genres",
    options: [
      { label: "RPG", value: "RPG", isSelected: true },
      { label: "Action", value: "Action", isSelected: false },
      { label: "Shooter", value: "Shooter", isSelected: false },
      { label: "Adventure", value: "Adventure", isSelected: false },
    ],
  },
  {
    label: "პლატფორმა",
    value: "platforms",
    options: [
      { label: "Xbox", value: "xbox", isSelected: true },
      { label: "PC", value: "pc", isSelected: false },
      { label: "Sony Playstation", value: "ps", isSelected: false },
      { label: "Nintendo", value: "Nintendo", isSelected: true },
    ],
  },
  {
    label: "ავტორი",
    value: "company",
    options: [
      { label: "Riot", value: "riot", isSelected: false },
      { label: "Respawn", value: "Respawn", isSelected: false },
    ],
  },
];
import { Example, IExampleProps } from "@blueprintjs/docs-theme";

import { FocusStyleManager } from "@blueprintjs/core";

const GamesList = (props) => {
  const [filterListStore, setFilters] = useFilterLineContext();

  const exampleMenu = (
    <Menu className={Classes.DARK}>
      <MenuItem icon="graph" text="Graph" />
      <MenuItem icon="map" text="Map" />
      <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
      <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
      <MenuDivider />
      <MenuItem icon="cog" text="Settings...">
        <MenuItem icon="add" text="Add new application" disabled={true} />
        <MenuItem icon="remove" text="Remove application" />
      </MenuItem>
    </Menu>
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const handleButtonClick = React.useCallback(() => setIsOpen(!isOpen), []);
  const handleClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <div>
      <Popover2
        portalClassName={Classes.DARK}
        inheritDarkTheme
        content={exampleMenu}
        placement="bottom"
      >
        <Button className={Classes.DARK} icon="share" text="Open in..." />
      </Popover2>
      {/* {JSON.stringify(filterListStore.activeFilters)} */}
      {/* {props.filters.} */}
      <div>
        <Button
          className={Classes.DARK}
          intent="none"
          onClick={handleButtonClick}
          text={"Open"}
        />
        <Dialog
          portalClassName={Classes.DARK}
          {...props}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <div>content</div>
        </Dialog>
      </div>
    </div>
  );
};

const GamesPage = (props: any, data?: any) => {
  // const [filterListStore, setFilters] = useFilterLineContext();
  const dispatch = useDispatch();
  const gameList = useAppSelector((state) => state.gamesPage);
  const gameListFilters = useAppSelector(
    (state) => state.gamesPage.filterOptions
  );

  useEffect(() => {
    console.log("[GAMES PAGE] init");
    // setFilters({ type: 'SET_FILTERS', value: GamesPageFilters });
    // dispatch(myAsyncInSlice({path: 'user-games.json', filters: GamesPageFilters}));
  }, []);

  useEffect(() => {
    console.log("gameList", gameList);
    console.log("gameListFilters", gameListFilters);
  }, [gameList]);

  const getGames = (filterOptions) => {
    console.log("Getting games with Filter:", filterOptions);
  };

  return (
    <React.Fragment>
      <div className="games-page games-page--wrap">
        <HeadingSlider />

        <FilterLine filterList={GamesPageFilters} getURI={() => {}} />

        <GamesList />
      </div>
    </React.Fragment>
  );
};

export default GamesPage;
