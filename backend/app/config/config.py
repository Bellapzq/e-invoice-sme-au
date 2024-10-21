from dynaconf import Dynaconf
from pathlib import Path
import glob

__all__ = ("config",)

ROOT_DIR = Path(__file__).parent

def read_files(file_path: str) -> list:
    return glob.glob(file_path, root_dir=ROOT_DIR)

confs = read_files("default/*yml")
config = Dynaconf(
    settings_file=confs,
    core_loaders=["YAML"],
    load_dotenv=True,
    root_path=ROOT_DIR
)
