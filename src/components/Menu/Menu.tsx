import React, { useEffect, useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";

import { FolderBox } from "../FolderBox";
import { NewFolder } from "../NewFolder";

import * as sdk from "../../sdk";

import styles from "./Menu.module.css";
import { State } from "../../redux/reducers";
import { Folder } from "../../sdk/types";

interface Props {
  beam: number;
}

const MenuContainer: FunctionComponent<Props> = ({ beam }) => {
  const [folderNames, setFolderNames] = useState(Array());

  const navigation = useNavigation();

  useEffect(() => {
    sdk.getFolderNames().then(setFolderNames);
  }, [beam]);

  return (
    <div className={styles.folderWindow}>
      <section className={styles.folders}>
        {folderNames.map((folder: Folder) => (
          <FolderBox
            folder={folder}
            key={folder.id}
            onDelete={() => {
              sdk
                .deleteFolder(folder.id)
                .then(() =>
                  setFolderNames(
                    folderNames.filter(
                      filterFolder => folder.id !== filterFolder.id
                    )
                  )
                );
            }}
          />
        ))}
      </section>
      <div className={styles.button}>
        <NewFolder
          onAdd={(name, foreignLanguage, nativeLanguage) => {
            const newFolder = {
              name: name.replace(/\s/g, "") !== "" ? name : "Unnamed",
              foreignLanguage:
                foreignLanguage.replace(/\s/g, "") !== ""
                  ? foreignLanguage
                  : "Foreign language",
              nativeLanguage:
                nativeLanguage.replace(/\s/g, "") !== ""
                  ? nativeLanguage
                  : "Native language"
            };
            sdk.createFolder(newFolder).then(data => {
              const newFolder = data.data[0];
              setFolderNames([newFolder, ...folderNames]);
              navigation.navigate(`/voc/${newFolder.id}`);
            });
          }}
        />
      </div>
    </div>
  );
};

const mapStateProps = (state: State) => ({
  beam: state.hookBeamReducer.beam
});

export const Menu = connect(mapStateProps)(MenuContainer);
