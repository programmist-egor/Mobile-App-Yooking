import {StyleSheet} from "react-native"

export const stylesFlex = StyleSheet.create({
    rowCC: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowFSSB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    rowFSFS: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    rowCFS: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rowCFE: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rowSAC: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowSAFS: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    rowSBC: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowWrapCC: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    columnSBC: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    columnFS: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    columnFSFE: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    columnC: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    columnFSC: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    columnSB: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});