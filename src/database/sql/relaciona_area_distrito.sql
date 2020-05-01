DROP TRIGGER IF EXISTS relaciona_area_distrito;
DELIMITER $$
CREATE TRIGGER relaciona_area_distrito
    AFTER INSERT
    ON area FOR EACH ROW
BEGIN
    INSERT INTO `distrito-area` (distrito_id, area_id)
    SELECT distrito.id as distritoId, NEW.id as areaId
    FROM distrito
    WHERE ST_Intersects(distrito.geometria, NEW.geometria);
END;$$
DELIMITER ;